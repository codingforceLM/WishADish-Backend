"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./model/user/User");
var Dish_1 = require("./model/food/dish/Dish");
var DishIngredient_1 = require("./model/food/dish/DishIngredient");
var Ingredient_1 = require("./model/food/ingredients/Ingredient");
var userController = require("./controller/UserController");
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "wishadish",
    entities: [
        User_1.User,
        Dish_1.Dish,
        DishIngredient_1.DishIngredient,
        Ingredient_1.Ingredient
    ],
    synchronize: true,
    logging: false
}).then(function (connection) {
    console.log("Connection established!");
}).catch(function (error) { return console.log(error); });
//Create a new express app instance
var app = express();
app.use("/bestinbuis", userController);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
