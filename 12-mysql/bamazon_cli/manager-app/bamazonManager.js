var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config({ path: "../.env" });
// I hid the server info just in case. (Don't know if it can be abused, just being 'safe').
var connection = mysql.createConnection({
    host: process.env.DB_HOST,

    port: 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASS,
    database: "bamazon"
});
// Upon connecting to the database, run the function managerOptions.
connection.connect(function (err) {
    if (err) throw err;
    managerOptions();
});
// Functions
// Function that displays the different options for the manager to select.
function managerOptions() {
    inquirer.prompt(
        {
            name: "action",
            message: "WHAT WOULD YOU LIKE TO DO?",
            type: "list",
            choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "EXIT"]
        }
    ).then(function (answer) {
        switch (answer.action) {
            case "VIEW PRODUCTS FOR SALE":
                showAllProducts();
                break;

            case "VIEW LOW INVENTORY":
                lowInventory();
                break;

            case "ADD TO INVENTORY":
                addToInventory();
                break;

            case "ADD NEW PRODUCT":
                createItem();
                break;

            case "EXIT":
                connection.end();
                break;
        }
    });
}
// Function that displays all products to the manager.
function showAllProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var resultsArr = [];
        for (i = 0; i < results.length; i++) {
            resultsArr.push("\nITEM ID: " + results[i].item_id + " || ITEM: " + results[i].product_name + " || PRICE: " + results[i].price + " || QUANTITY: " + results[i].stock_quantity + "\n\n--------------------------------------------------------------------------");
        }
        console.log("\nPRODUCTS FOR SALE:\n" + resultsArr.join("\n"));
        managerOptions();
    });
}
// Function that displays all products with a quantity of less than 5, to the manager.
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        var resultsArr = [];
        for (i = 0; i < results.length; i++) {
            resultsArr.push("\nITEMS THAT ARE IN LOW SUPPLY:\nITEM ID: " + results[i].item_id + " || ITEM: " + results[i].product_name + " || PRICE: " + results[i].price + " || QUANTITY: " + results[i].stock_quantity + "\n\n--------------------------------------------------------------------------");
        }
        // If there are no items with a stock quantity of less than 5, alert the manager.
        if (resultsArr.length === 0) {
            console.log("\nNO ITEMS ARE IN SHORT SUPPLY!\n");
            managerOptions();
        }
        else {
            console.log(resultsArr.join("\n"));
            managerOptions();
        }
    });
}
// Function that lets the manager add more stock quantity to any product.
function addToInventory() {
    inquirer.prompt([
        {
            name: "itemId",
            message: "ENTER THE ID OF THE ITEM YOU WISH TO RESTOCK",
            type: "input",
            validate: function (value) {
                if (isNaN(value) === true || value == 0) {
                    return false;
                }
                return true;
            }
        },
        {
            name: "units",
            message: "HOW MANY UNITS WOULD YOU LIKE TO STOCK? (IF YOU CHANGED YOUR MIND, TYPE exit)",
            type: "input",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                else if (value.toLowerCase() === "exit") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]).then(function (answer) {
        if (answer.units.toLowerCase() === "exit") {
            managerOptions();
        }
        else {
            var query = "UPDATE products SET stock_quantity=stock_quantity+? WHERE item_id=?";
            answer.item = parseInt(answer.itemId);
            answer.units = parseInt(answer.units);

            var values = [answer.units, answer.itemId];

            connection.query(query, values, function (err, results) {
                if (err) throw err;
                console.log("\nTHE ITEM HAS BEEN RESTOCKED!\n");
                showAllProducts();
            });
        }
    });
}

// Function that inserts the data into the table 'products'.
function createItem() {
    var query = "SELECT DISTINCT department_name FROM products";
    connection.query(query, function (err, results) {
        if (err) throw err;

        var departmentsListArr = [];

        for (i = 0; i < results.length; i++) {
            departmentsListArr.push(results[i].department_name);
        }

        inquirer.prompt([
            {
                name: "item",
                message: "WHAT IS THE PRODUCT NAME?"
            },
            {
                name: "department",
                message: "WHAT IS THE DEPARTMENT NAME?",
                type: "list",
                choices: departmentsListArr
            },
            {
                name: "price",
                message: "HOW MUCH DOES IT COST?"
            },
            {
                name: "quantity",
                message: "HOW MANY ARE CURRENTLY IN STOCK?"
            }
        ]).then(function (answer) {

            // Converting the values of price and quantity into numbers.
            answer.price = parseFloat(answer.price);
            answer.quantity = parseInt(answer.quantity);

            // Storing all of the data into an array called 'values' so it can be passed easilt into the addItem function.
            var values = [answer.item, answer.department, answer.price, answer.quantity];
            
           console.log(values);
           addItem(values);
        });
    });
}

// Function takes the data from the createItem function and inserts it into the table.
function addItem(values) {

    var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";

    connection.query(query, values, function (err, results) {
        if (err) throw err;

        console.log("\nITEM HAS BEEN ADDED!\n");
        showAllProducts();
    });
}