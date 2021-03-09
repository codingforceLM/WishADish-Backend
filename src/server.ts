import express = require('express');
import "reflect-metadata";
import { createConnection } from "typeorm";

import { User } from "./model/user/User";
import { Dish } from "./model/food/dish/Dish";
import { DishIngredient} from "./model/food/dish/DishIngredient";
import { Ingredient} from "./model/food/ingredients/Ingredient";
import { Wish } from "./model/food/dish/Wish";
import { Group } from "./model/user/group/Group";
import { UserGroup } from "./model/user/UserGroup";
import { Vote } from "./model/user/vote/Vote";
import { ShoppingList } from "./model/shoppinglist/ShoppingList";
import { ShoppingListIngredient } from "./model/shoppinglist/ShoppingListIngredient";
import { Invitation } from "./model/user/group/Invitation";

const ormconfig = require("../config/ormconfig.json");
const userController = require("./controller/UserController");
const wishController = require("./controller/WishController");
const voteController = require("./controller/VoteController");
const listController = require("./controller/ListController");
const dishController = require("./controller/DishController");
const ingrdController = require("./controller/IngrdController");
const groupController = require("./controller/GroupController");


ormconfig.entities = [
	User,
	Dish,
	DishIngredient,
	Ingredient,
	Wish,
	Group,
	UserGroup,
	Vote,
	ShoppingList,
	ShoppingListIngredient,
	Invitation
]


createConnection(
	ormconfig
).then(connection => {
	console.log("Connection established!");
}).catch(error => console.log(error));

//Create a new express app instance
const app: express.Application = express();

app.use("/api/user", userController);
app.use("/api/group", groupController);
app.use("/api/wish", wishController);
app.use("/api/vote", voteController);
app.use("/api/list", listController);
app.use("/api/dish", dishController);
app.use("/api/ingrd", ingrdController);

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.listen(3000, function() {
	console.log('App is listening on port 3000!');
});