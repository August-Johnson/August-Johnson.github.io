var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Au98gust98!",
    database: "top_songsDB"
});