const express = require("express");
const sql = require("mssql");

const app = express();


// SQL Server configuration
let config = {
    "user": "sa", // Database username
    "password": "Josh@4889", // Database password
    "server": "localhost", // Server IP address
    "database": "ecommerce_db", // Database name
    "options": {
        "encrypt": false // Disable encryption
    }
};

// Connect to SQL Server
sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

// Define route for fetching data from SQL Server
app.get("/users", (request, response) => {
    // Execute a SELECT query
    new sql.Request().query("SELECT user_id, user_name, user_email FROM users", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            response.json(result.recordset); // Send query result as response
            console.dir(result.recordset);
        }
    });
});

//Route for fetching PRODUCTS data from SQL server
app.get('/products', (req, res)=>{
    new sql.Request().query("SELECT product_id, product_name, product_description FROM products", (err, result) => {
        if (err) {
            console.log("Internal sever error", err)
        }else{
            res.json(result.recordset)
            console.dir(result.recordset);
        }
    });
});

// Start the server on port 3000
const port = 3000

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});