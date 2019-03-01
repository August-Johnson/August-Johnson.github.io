var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
// I hid the server info just in case. (don't know if it can be abused, just being 'safe').
var connection = mysql.createConnection({
    host: process.env.DB_HOST,

    port: 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASS,
    database: "bamazon"
});
// Upon connecting the the database, run the function that asks the user what they want to do
connection.connect(function (err) {
    if (err) throw err;
    askUser();
});
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
                userShop();
                break;

            case "EXIT":
                connection.end();
                break;
        }
    });
}
// Function for if the user chose to browse items. Show the list of items and ask for the id number of the item they want, then ask for the quantity.
function userShop() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var resultsArr = [];
        for (i = 0; i < results.length; i++) {
            resultsArr.push("\nITEM ID: " + results[i].item_id + " || ITEM: " + results[i].product_name + " || PRICE: " + results[i].price + " || QUANTITY: " + results[i].stock_quantity + "\n\n--------------------------------------------------------------------------");
        }
        console.log(resultsArr.join("\n"));
        // Prompt to ask the user what item they want to make a purchase on
        inquirer.prompt(
            {
                name: "item",
                message: "ENTER THE ID OF THE ITEM YOU WISH TO PURCHASE",
                type: "input",
                validate: function (value) {
                    if (isNaN(value) === true) {
                        return false;
                    }
                    return true;
                }
            }
        ).then(function (answer) {
            // function goes here
        });

    });
}

// function for having the user enter the quantity of the item