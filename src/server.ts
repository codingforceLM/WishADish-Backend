import express = require('express');
import "reflect-metadata";
import { createConnection } from "typeorm";

import { User } from "./model/user/User";
import { Dish } from "./model/food/dish/Dish";
import { DishIngredient} from "./model/food/dish/DishIngredient";
import { Ingredient} from "./model/food/ingredients/Ingredient";

const userController = require("./controller/UserController");

createConnection({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "root",
	database: "wishadish",
	entities: [
		User,
		Dish,
		DishIngredient,
		Ingredient
	],
	synchronize: true,
	logging: false
}).then(connection => {
	console.log("Connection established!");
}).catch(error => console.log(error));

//Create a new express app instance
const app: express.Application = express();

app.use("/bestinbuis", userController);

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.listen(3000, function() {
	console.log('App is listening on port 3000!');
});