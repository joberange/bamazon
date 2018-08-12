var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    productInstock(getID);
});

var dash = "======================================================================================================================================="

function productInstock(callback) {
    var itemIds = [];
    var query = "SELECT * FROM products;";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(dash + "\n" + "Item: " + res[i].ID + " || Name: " + res[i].Item + " || Dept: " + res[i].Department + " || Price: " + res[i].Price + "|| Stock: " + res[i].Stock);
            itemIds.push(res[i].ID);

        }
        console.log(dash);
        return callback(itemIds);
    })
};

function getID(items) {
    inquirer
        .prompt([{
            name: "ID",
            type: "input",
            message: "Please select the Item # of the product you would like to buy?",
            validate: function validateID(id) {
                return id !== '' && items.indexOf(parseInt(id)) > -1;
            }
        }, {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (amount) {
                if (isNaN(amount) === false) {
                    return true;

                }
                return false;
            }
        }])
        .then(function (answer) {
            var purchasedStock = parseInt(answer.amount);
            var purchasedItem = parseInt(answer.ID);
            var query = "SELECT ID, Item, Price, Stock FROM products WHERE ID= ? ";
            connection.query(query, [purchasedItem], function (err, res) {
                var quantity = parseInt(res[0].Stock);
                var cost = parseFloat(res[0].Price);
                var total = purchasedStock * cost;
                if (purchasedStock - quantity >= 0) {
                    connection.query('UPDATE products SET Stock = Stock -? WHERE ID= ? ', [purchasedStock, purchasedItem], function (err, res) {
                        if (err) throw err;
                    });
                    console.log("\n" + "There are " + res[0].Stock + " " + res[0].Item + "'s available, at the price of: " + "$" + res[0].Price + "\n" + dash + "\n" + "Your total comes to $" + total + "\n" + dash);
                } else {
                    console.log(dash + "\n" + "Insufficient invetory on " + res[0].Item + "\n" + dash);
                    // shopMore();
                }
                shopMore();
            })
        })
};

function endApp() {
    console.log(dash + "\n" + "Come back to Bamazon!" + "\n" + dash)
    process.exit(0);
};

function shopMore() {
    inquirer
        .prompt({
            name: "more",
            type: "list",
            message: "Would you like to continue shopping?",
            choices: [
                "NO.",
                "Yes!"
            ]
        })
        .then(function (answer) {
            switch (answer.more) {
                case "NO.":
                    endApp();
                    break;

                case "Yes!":
                    productInstock(getID);
                    break;
            }
        })
};

