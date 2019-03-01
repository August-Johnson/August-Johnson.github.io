DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE products (
item_id INT(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Monopoly", "Board Games", 14.99, 75),
("Whey Protein", "Nutrition and Health", 29.99, 50),
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
-- Updating the stock_quantity (started with subtracting 1 for testing) --
UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE item_id = 2;
-- Testing the results value --
SELECT * FROM products WHERE item_id = 2;