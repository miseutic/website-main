"use strict";

var db = require('../db-connections');

class UserAccDB {
    getAllUserAcc(callback) {
        var sql = "SELECT userId, username FROM mysql.user_account";
        db.query(sql, callback);
    }

    getUser(username, callback) {
        var sql = "SELECT distinct username, email_address, profile_picture from mysql.user_acount WHERE username = ?";
        db.query(sql, [username], callback);
    }

    addUser(username, password, callback) {
        var sql = "INSERT INTO user_account(username, password) VALUES (?, ?)";
        db.query(sql, [username, password], callback);
    }

    loginUser(username, callback) {
        var sql = "SELECT password from mysql.user_account WHERE username = ?";
        db.query(sql, [username], callback);
    }

    updateUser(username, callback) {
        var sql = "UPDATE user_account SET mobile_number = ?, email_address = ?, profile_picture = ?,first_name = ?, last_name = ?, gender = ?, address = ?  WHERE username = ?";
        return db.query(sql, [password, mobile_number, email_address, profile_picture, first_name, last_name, gender, address, username], callback);
    }

    deleteUser(userId, callback) {
        var sql = "DELETE from user_account WHERE userId = ?";
        return db.query(sql, [userId], callback);
    }
}

module.exports = UserAccDB;