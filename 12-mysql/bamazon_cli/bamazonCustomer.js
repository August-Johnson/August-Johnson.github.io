var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
// I hid the server info just in case. (Don't know if it can be abused, just being 'safe').
var connection = mysql.createConnection({
    host: process.env.DB_HOST,

    port: 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASS,
    database: "bamazon"
});
// Upon connecting t0 the database, run the function that asks the user what they want to do.
connection.connect(function (err) {
    if (err) throw err;
    askUser();
});
// Functions
// Function for initially asking the user what they want to do, (browse items or exit).
function askUser() {
    inquirer.prompt(
        {
            name: "action",
            message: "WHAT WOULD YOU LIKE TO DO?",
            type: "list",
            choices: ["BROWSE ITEMS", "EXIT"]
        }
    ).then(function (answer) {
        switch (answer.action) {
            case "BROWSE ITEMS":
                showItems();
                break;

            case "EXIT":
                connection.end();
                break;
        }
    });
}
// Function for if the user chose to browse items. Show the list of items and then run the function to deal with the purchase step.
function showItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var resultsArr = [];
        for (i = 0; i < results.length; i++) {
            resultsArr.push("\nITEM ID: " + results[i].item_id + " || ITEM: " + results[i].product_name + " || PRICE: " + results[i].price + " || QUANTITY: " + results[i].stock_quantity + "\n\n--------------------------------------------------------------------------");
        }
        console.log(resultsArr.join("\n"));
        userPurchase();
    });
}
// Function that asks the user what item and how many of them they want to purchase.
function userPurchase() {
    inquirer.prompt([
        {
            name: "item",
            message: "ENTER THE ID OF THE ITEM YOU WISH TO PURCHASE",
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
            message: "HOW MANY UNITS WOULD YOU LIKE TO PURCHASE? (IF YOU CHANGED YOUR MIND, TYPE exit)",
            type: "input"
        }
    ]).then(function (answer) {
        // In case the user changed their mind, they can type 'exit' and it'll take them back to the starting prompt.
        if (answer.units.toLowerCase() === "exit") {
            askUser();
        }
        else {
            // Converting the users input into numbers so it can be compared to the table's numerical values.
            answer.item = parseInt(answer.item);
            answer.units = parseInt(answer.units);

            var query = "SELECT * FROM products WHERE item_id=?";
            connection.query(query, answer.item, function (err, results) {
                if (err) throw err;

                if (answer.units > results[0].stock_quantity) {
                    // If there isn't as much of the product in stock as the user wanted to order, display message to them.
                    console.log("\nNOT ENOUGH OF '" + results[0].product_name + "' IN STOCK!\n");
                    askUser();
                } else {
                    // If there is enough of the product in stock, run the function that handles updating the table data.
                    // Passing the relevant values as arguements.
                    validQuantity(answer.item, answer.units, results[0]);
                }
            });
        }
    });
}
// Function for if there was enough product to match the user's order.
function validQuantity(itemId, unitsAmount, results) {
    var query = "UPDATE products SET stock_quantity=? WHERE ?";
    // Calculating the total cost of the order.
    var total = unitsAmount * results.price;
    connection.query(query, [results.stock_quantity - unitsAmount, { item_id: itemId }], function () {
        console.log("\nYOUR TOTAL IS $" + total + "\n");
        askUser();
    });
}