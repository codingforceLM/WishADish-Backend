"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
//Create a new express app instance
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/products', function (req, res) {
    res.send("Was gibt's eig. neues auf <a href=\"http://www.metal.de\">Metal.de</a>?");
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
