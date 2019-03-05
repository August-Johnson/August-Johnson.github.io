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
    supervisorOptions();
});
// Functions
// Function for initially asking the user what they want to do, (browse items or exit).
function supervisorOptions() {
    inquirer.prompt(
        {
            name: "action",
            message: "WHAT WOULD YOU LIKE TO DO?",
            type: "list",
            choices: ["VIEW PRODUCT SALES BY DEPARTMENT", "CREATE NEW DEPARTMENT", "EXIT"]
        }
    ).then(function (answer) {
        switch (answer.action) {
            case "VIEW PRODUCT SALES BY DEPARTMENT":
                // function
                break;

                case "CREATE NEW DEPARTMENT":
                // function
                break;

            case "EXIT":
                connection.end();
                break;
        }
    });
}
// Function for if the user chose to browse items. Show the list of items and then run the function to deal with the purchase step.
function departmentSales() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        var resultsArr = [];
        for (i = 0; i < results.length; i++) {
            resultsArr.push("\nDEPARTMENT ID: " + results[i].department_id + " || DEPARTMENT NAME: " + results[i].department_name);
        }
        console.log("\n" + resultsArr.join("\n"));
        // function
        supervisorOptions();
    });
}