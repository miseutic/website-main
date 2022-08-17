"use strict";
const UserAccDB = require("../models/UserAccDB");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userAccDB = new UserAccDB();
var secret = "somesecretkey"

function getAllUserAcc(request, respond) {
    userAccDB.getAllUserAcc(function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });

}

function addUser(request, respond) {
    var username = request.body.username;
    var password = request.body.password;
    password = bcrypt.hashSync(password, 10);

    userAccDB.addUser(username, password, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    })
}

function loginUser(request, respond) {
    var username = request.body.username;
    var password = request.body.password;

    userAccDB.loginUser(username, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            const hash = result[0].password;
            var flag = bcrypt.compareSync(password, hash);
            if (flag) {
                var token = jwt.sign(username, secret);
                respond.json({ result: token});
            } else {
                respond.json({ result: "invalid" });
            }
        }
    })
}

function updateUser(request, respond) {
    var password = request.body.password;
    password = bcrypt.hashSync(password, 10)
    var user = new User(request.params.userId, request.body.username, password, request.body.mobile_number, request.body.email_address, request.body.profile_picture, request.body.first_name, request.body.last_name, request.body.gender, request.body.address);
    usersDB.updateUser(user, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        };
    })
}

function deleteUser(request, respond) {
    var userID = request.params.id;
    userAccDB.deleteUser(userID, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function getUser(request, respond) {
    var token = request.body.token;

    try {
        var decoded = jwt.verify(token, secret);
        respond.json({ result: decoded });
    } catch (err) {
        respond.json({ result: "invalid token" });
    }
}



module.exports = { getAllUserAcc, addUser, updateUser, deleteUser, loginUser, getUser };