"use strict";
var logsysconfig = require("../../config/logsysconfig.json");
var jwt = require("jsonwebtoken");
module.exports = {
    validateRegister: function (req, res, next) {
        // username min length 3
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
                msg: 'Please enter a username with min. 3 chars'
            });
        }
        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                msg: 'Please enter a password with min. 6 chars'
            });
        }
        // password (repeat) does not match
        if (!req.body.password_repeat ||
            req.body.password != req.body.password_repeat) {
            return res.status(400).send({
                msg: 'Both passwords must match'
            });
        }
        next();
    },
    isLoggedIn: function (req, res, next) {
        try {
            var token = req.headers.authorization.split(' ')[1];
            var decoded = jwt.verify(token, logsysconfig.jwtsecret);
            req.userData = decoded;
            next();
        }
        catch (e) {
            return res.status(401).send({
                msg: 'Your session is not valid!'
            });
        }
    }
};
