"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./model/user/User");
var Dish_1 = require("./model/food/dish/Dish");
var DishIngredient_1 = require("./model/food/dish/DishIngredient");
var Ingredient_1 = require("./model/food/ingredients/Ingredient");
var Wish_1 = require("./model/food/dish/Wish");
var Group_1 = require("./model/user/group/Group");
var UserGroup_1 = require("./model/user/UserGroup");
var Vote_1 = require("./model/user/vote/Vote");
var ShoppingList_1 = require("./model/shoppinglist/ShoppingList");
var ShoppingListIngredient_1 = require("./model/shoppinglist/ShoppingListIngredient");
var Invitation_1 = require("./model/user/group/Invitation");
var ormconfig = require("../config/ormconfig.json");
var userController = require("./controller/UserController");
var wishController = require("./controller/WishController");
var voteController = require("./controller/VoteController");
var listController = require("./controller/ListController");
var dishController = require("./controller/DishController");
var ingrdController = require("./controller/IngrdController");
var groupController = require("./controller/GroupController");
ormconfig.entities = [
    User_1.User,
    Dish_1.Dish,
    DishIngredient_1.DishIngredient,
    Ingredient_1.Ingredient,
    Wish_1.Wish,
    Group_1.Group,
    UserGroup_1.UserGroup,
    Vote_1.Vote,
    ShoppingList_1.ShoppingList,
    ShoppingListIngredient_1.ShoppingListIngredient,
    Invitation_1.Invitation
];
typeorm_1.createConnection(ormconfig).then(function (connection) {
    console.log("Connection established!");
}).catch(function (error) { return console.log(error); });
//Create a new express app instance
var app = express();
app.use("/api/user", userController);
app.use("/api/group", groupController);
app.use("/api/wish", wishController);
app.use("/api/vote", voteController);
app.use("/api/list", listController);
app.use("/api/dish", dishController);
app.use("/api/ingrd", ingrdController);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
