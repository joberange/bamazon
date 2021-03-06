-- DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    ID INTEGER(10) NOT NULL,
    Item VARCHAR(50) NOT NULL,
    Department VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock INTEGER(50) NOT NULL,
    PRIMARY KEY(ID)
);

INSERT INTO products(ID, Item, Department, Price, Stock)
VALUES(1, "SKATES", "SPORTS", 49.99, 1000),
(2, "COMPUTER", "ELECTRONICS", 599.99, 1000),
(3, "HAMMER", "TOOLS", 19.99, 1000),
(4, "CHAIR", "FURNITURE", 59.99, 1000),
(5, "SAW", "TOOLS", 39.99, 1000),
(6, "IPAD", "ELECTRONICS", 299.99, 1000),
(7, "MATTRESS", "FURNITURE", 799.99, 1000),
(8, "FOOTBALL", "SPORTS", 9.99, 1000),
(9, "HAM", "FOOD", 19.99, 1000),
(10, "SNICKERS", "FOOD", .99, 1000);

SELECT * FROM products;