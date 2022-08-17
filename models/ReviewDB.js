"use strict";

var db = require('../db-connections');

class ReviewDB{
    getAllReview(callback){
        var sql = "SELECT * from mysql.review;";
        db.query(sql, callback);
    }

    addReview(review, callback){
        var sql = "INSERT INTO review (restaurantId, username, rating, review, datePosted) VALUES (?, ?, ?, ?, ?);";
        db.query(sql, [review.getRestaurantId(), review.getUsername(), review.getRating(), review.getReview(), review.getDatePosted()], callback);
    }
    updateReview(review, callback){
        var sql = "UPDATE review SET review = ?, username = ?, rating = ?, datePosted = ? WHERE reviewId = ?;";
        return db.query(sql, [review.getReview(), review.getUsername(), review.getRating(), review.getDatePosted(), review.getReviewId()], callback);
    }
    deleteReview(reviewId, callback){
        var sql = "DELETE from review WHERE reviewId = ?;";
        return db.query(sql, [reviewId], callback);
    }
}

module.exports = ReviewDB;
