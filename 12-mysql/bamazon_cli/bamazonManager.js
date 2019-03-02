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
                addNewItem();
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
        console.log(resultsArr.join("\n"));
        managerOptions();
    });
}
// Function that displays all products with a quantity of less than 5, to the manager.
function lowInventory() {
    
}
// Function that lets the manager add more stock quantity to any product.
function addToInventory() {

}
// Function that allows the manager to add a new product to the table.
function addNewItem() {

}