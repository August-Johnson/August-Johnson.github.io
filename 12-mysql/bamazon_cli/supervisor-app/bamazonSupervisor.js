var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config( {path: "../.env"} );
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
                departmentSales();
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
    var query = "SELECT DISTINCT departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS product_sales";
    query += " FROM departments";
    query += " INNER JOIN products ON products.department_name = departments.department_name";
    query += " GROUP BY department_name;";

    connection.query(query, function(err, results) {
        if (err) throw err;
        
        console.log(results[0]);
    });
}