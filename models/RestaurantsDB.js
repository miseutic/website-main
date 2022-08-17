"use strict"

var db = require('../db-connections');
class RestaurantsDB {
	getAllRestaurants(callback) {
		var sql = "SELECT * from mysql.restaurant";
		db.query(sql, callback);
	}
}

module.exports = RestaurantsDB;
