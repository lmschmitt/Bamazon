--Create a MySQL Database called Bamazon
CREATE DATABASE Bamazon; 
use Bamazon;

--create a Table inside of that database called products
CREATE TABLE products (
item_id INTEGER AUTO-INCREMENT NOT NULL,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR (50) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity DECIMAL(10,2) NOT NULL,
PRIMARY KEY (item_id)
);

--Populate this database with around 10 different products

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ("macbook", "electronics", 2,000.00, 15),
    ("iphone", "electronics", 700.00, 45),
    ("t-shirt", "clothing", 25.50, 200),
    ("jeans", "clothing", 45.99, 120),
    ("popcorn", "food", 3.99, 300),
    ("coffee", "food", 4.99, 140),
    ("towel", "housewares", 9.99, 60),
    ("pillow", "housewares", 20.00, 45),
    ("vans", "shoes", 45.99, 65), 
    ("converse", "shoes", 39.99, 20);