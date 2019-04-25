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
// Upon connecting to the database, run supervisorOptions function.
connection.connect(function (err) {
    if (err) throw err;
    supervisorOptions();
});
// Functions
// Function for asking the supervisor what they want to do.
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
// Function for the supervisor to view departments data and sales.
function departmentSales() {
    var query = "SELECT DISTINCT departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS product_sales";
    query += " FROM departments";
    query += " INNER JOIN products ON products.department_name = departments.department_name";
    query += " GROUP BY department_name;";

    connection.query(query, function(err, results) {
        if (err) throw err;
        
        var departmentsArr = [];
        for (i=0;i<results.length;i++) {

            // Calculating the total profir of each department.
            var totalProfit = results[i].product_sales - results[i].overhead_costs;
            // Pushing the relevant data to departmentsArr.
            departmentsArr.push("\nDEPARTMENT ID: " + results[i].department_id + 
            " || DEPARTMENT NAME: " + results[i].department_name + 
            " || OVERHEAD COSTS: $" + results[i].overhead_costs + 
            " || PRODUCT SALES: $" + results[i].product_sales + 
            " || TOTAL PROFIT: $" + totalProfit + 
            "\n\n------------------------------------------------------------------------------------------");
        }
        // Logging the 'finished' departmentsArr to the supervisor, and then runs the function for the supervisor to choose what they want to do.
        console.log(departmentsArr.join("\n") + "\n");
        supervisorOptions();
    });
}

// Function that lets the supervisor add a new department.