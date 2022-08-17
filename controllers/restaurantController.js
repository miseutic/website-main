"use strict";
const RestaurantsDB = require('../models/RestaurantsDB');

var restaurantsDB = new RestaurantsDB();

function getAllRestaurants(request, respond) {
    restaurantsDB.getAllRestaurants(function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });

}

function searchRestaurants(req, res, next) {
    //search term from user
    var searchTerm = req.query.search;
    //selected category
    var category = req.query.category;

    let query = 'SELECT * FROM Posting';
    if (searchTerm != '' && category != '') {
        query = `SELECT * FROM Posting WHERE Category ='` + category + `'AND (Name LIKE '%` + searchTerm + `%')`;
    }
    else if (searchTerm != '' && category == '') {
        query = `SELECT * FROM Posting WHERE Name LIKE '%` + searchTerm + `%' OR Comment LIKE '%` + searchTerm + `%'`;
    }
    else if (searchTerm == '' && category != '') {
        query = `SELECT * FROM Posting WHERE Category = '` + category + `'`;
    }
    database.query(query, (err, result) => {
        if (err) {
            req.searchResult = "";
            req.searchTerm = "";
            req.category = "";
            next();
        }

        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.category = "";
        next();
    });
}

module.exports = { getAllRestaurants, searchRestaurants};