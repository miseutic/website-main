"use strict";
const ReviewDB = require('../models/ReviewDB');
const Review = require('../models/Review');

var reviewDB = new ReviewDB();

function getAllReview(request, respond) {
    reviewDB.getAllReview(function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });

}

function addReview(request, respond) {
    var now = new Date();
    var review = new Review(null, request.body.restaurantId, request.body.username, request.body.rating, request.body.review, now.toString());
    reviewDB.addReview(review, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function updateReview(request, respond) {
    var now = new Date();
    var review = new Review(parseInt(request.params.id), request.body.restaurantId, request.body.username, request.body.rating, request.body.review, now.toString());
    reviewDB.updateReview(review, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function deleteReview(request, respond) {
    var reviewId = request.params.id;
    reviewDB.deleteReview(reviewId, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getAllReview, addReview, updateReview, deleteReview};

