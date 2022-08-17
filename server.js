"use strict";

const express = require("express");
var reviewController = require('./controllers/reviewController'); // set reviewController to the reviewController class
var restaurantController = require('./controllers/restaurantController'); // set restaurantController to the restaurantController class
var userAccountController = require('./controllers/userAccountController');

const bodyParser = require("body-parser");
var app = express();
var host = "172.31.30.151";
var port = 8080;
var startPage = "index.html";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/restaurant').get(restaurantController.getAllRestaurants); // activate the getAllRestaurant method if the route is GET(method) /restaurant

//routes for review
app.route('/review').get(reviewController.getAllReview) // activate the getAllReview method if the route is GET(method) /review
app.route('/review').post(reviewController.addReview); // activate the addReview method if the route is POST(method) /review
app.route('/review/:id').put(reviewController.updateReview) // activate the updateReview method if the route is PUT(method) /review/:id
app.route('/review/:id').delete(reviewController.deleteReview); // activate the deleteReview method if the route is DELETE(method) /review/:id

//routes for user_account
app.route('/users').get(userAccountController.getAllUserAcc);
app.route('/users').post(userAccountController.addUser);
app.route('/users').put(userAccountController.updateUser);
app.route('/users/:id').delete(userAccountController.deleteUser);
app.route('/login').post(userAccountController.loginUser);
app.route('/user').get(userAccountController.getUser);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

// this app starts a server and listens on port 8080 for connection
var server = app.listen(port, host, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("web server running @ http://127.0.0.1:8080");
});