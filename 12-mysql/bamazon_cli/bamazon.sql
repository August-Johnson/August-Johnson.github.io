DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
stock_quantity INT(10) NOT NULL,
product_sales INT NOT NULL DEFAULT 0,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Monopoly", "Board Games", 14.99, 75),
("Whey Protein", "Health", 29.99, 50),
("Anthem", "Video Games", 59.99, 1000),
("Jenga", "Board Games", 9.99, 100),
("50 inch TV", "Electronics", 299.99, 400),
("Headphones", "Electronics", 149.99, 20),
("Teddy Bear", "Toys", 10, 90),
("Gaming Keyboard", "Electronics", 80, 15),
("Wireless Mouse", "Electronics", 30, 100),
("Running Shoes", "Clothing", 75, 200);

SELECT * FROM products;

SELECT department_name, COUNT(*) AS selection FROM products
GROUP BY department_name;

-- Data for the supervisor version (still in progress) --
CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(40) NOT NULL,
overhead_costs INT NOT NULL DEFAULT 150,
product_sales INT NOT NULL DEFAULT 0,
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name)
SELECT DISTINCT department_name FROM products;

UPDATE departments SET overhead_costs = 15000 WHERE department_name = "Electronics";
UPDATE departments SET overhead_costs = 1200 WHERE department_name = "Board Games";
UPDATE departments SET overhead_costs = 20000 WHERE department_name = "Video Games";
UPDATE departments SET overhead_costs = 10000 WHERE department_name = "Clothing";
UPDATE departments SET overhead_costs = 2500 WHERE department_name = "Health";
UPDATE departments SET overhead_costs = 1500 WHERE department_name = "Toys";

SELECT * FROM departments;