var inquirer = require("inquirer");
var mysql = require("mysql");
var select = require("inquirer-select-line");

var connection = mysql.createConnection({
	host: 'localhost',
	port: 8889,
	user: 'root',
	password: 'root',
	database: 'Bamazon'
});



//ask product id for purchase.
var promptItemID = function (){

        inquirer.prompt([
            {
                name: "choice",
                type: "input",
                message: "Enter item id of item you would like to purchase" ,
                filter: Number,

            },
            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to purchase?",
                filter: Number,
            }
            
        ]).then(function(answer){
                var choice = answer.choice;
                var quantity = answer.quantity;
                var queryString = "SELECT * FROM products WHERE ?"

                connection.query(queryString, {item_id: choice}, function(err, results) {
                        if (err) throw err;
                        // console.log (results);
                        // console.log (quantity);
                        // console.log (results[0].stock_quantity);
                        if (results.length === 0) {
                            console.log ("Please choose a valid ID number")
                            displayProducts();
                        } else {
                            productInfo = results[0];
                            if (quantity <= productInfo.stock_quantity){
                            console.log("Congrats. You're item is in stock")
                            var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productInfo.stock_quantity - quantity) + ' WHERE item_id = ' + choice;
                                connection.query(updateQueryString, function(err, results) {
                                if (err) throw err;

                                console.log('Your oder has been placed! Your total is $' + productInfo.price * quantity);
                                console.log("\n---------------------------------------------------------------------\n");

                                // End the database connection
                                connection.end();
                                })
                                } else {
                                    console.log("insufficieny quantity")
                                }
                            }
                })        
            })  
};       


//display products
var displayProducts = function() {    
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                console.log("Item ID:" + results[i].item_id + " | Product Name: " + results[i].product_name + " | Department Name: " + results[i].department_name + " | Price: " + results[i].price + " | Quantity: " + results[i].stock_quantity)
            }
                promptItemID();
    })


}   

// displayProducts();
// promptItemID();

var startBamazon= function(){
    displayProducts();
}

startBamazon();


     

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.


