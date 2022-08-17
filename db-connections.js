var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'restaurantreview.cmkfu3uq9bax.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: '386462291955Is',
    database: 'mysql'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to DB');
});
module.exports = connection;