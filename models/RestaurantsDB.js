"use strict"

var db = require('../db-connections');
class RestaurantsDB {
	getAllRestaurants(callback) {
		var sql = "SELECT * from restaurantreview.restaurant";
		db.query(sql, callback);
	}
}

module.exports = RestaurantsDB;
