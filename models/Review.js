"use strict";

class Review {
    constructor(reviewId, restaurantId, username, rating, review, datePosted) {
        this.reviewId = reviewId;
        this.restaurantId = restaurantId;
        this.username = username;
        this.rating = rating;
        this.review = review;
        this.datePosted = datePosted;
    }

    getReviewId() {
        return this.reviewId;
    }

    getRestaurantId() {
        return this.restaurantId;
    }

    getUsername() {
        return this.username;
    }

    getRating() {
        return this.rating;
    }

    getReview() {
        return this.review;
    }

    getDatePosted() {
        return this.datePosted;
    }

    setReviewId(reviewId) {
        this.reviewId = reviewId;
    }

    setRestaurantId(restaurantId) {
        this.restaurantId = restaurantId;
    }

    setRating(rating) {
        this.rating = rating;
    }

    setReview(review) {
        this.review = review;
    }

    setUsername(username) {
        this.username = username;
    }

    setDatePosted(datePosted) {
        this.datePosted = datePosted;
    }
}

module.exports = Review;