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
).then(async connection => {
	console.log("Connection established!");

	console.log("Creating example data!");
	let inv: Array<Invitation> = [];
	let lists: Array<ShoppingList> = [];
	let wishes: Array<Wish> = [];

	let userA = new User(
		"8bdb8aed-e579-4b25-a16a-9cf219572ca7",
		"Thor",
		"Odinson",
		"thor@asgard.com",
		"2020-08-08",
		"tod",
		"https://static.wikia.nocookie.net/avengers/images/4/48/Thor_Gladiator.jpg/revision/latest/top-crop/width/360/height/360?cb=20171105082329&path-prefix=de",
		undefined as unknown as Dish[],
		undefined as unknown as Ingredient[],
		undefined as unknown as UserGroup[],
		undefined as unknown as Vote[],
		undefined as unknown as ShoppingList[]
	);

	let userB = new User(
		"3cb7d028-5629-442c-bd17-24689115694c",
		"Loki",
		"Odinson",
		"loki@asgard.com",
		"2020-08-08",
		"lod",
		"https://static.wikia.nocookie.net/antagonisten/images/2/2d/The-avengers-loki.jpg/revision/latest?cb=20170506225328&path-prefix=de",
		undefined as unknown as Dish[],
		undefined as unknown as Ingredient[],
		undefined as unknown as UserGroup[],
		undefined as unknown as Vote[],
		undefined as unknown as ShoppingList[]
	);

	let userC = new User(
		"40eca8dd-d3c4-47ae-9b95-8f57cb9d8185",
		"Heimdall",
		"Heimr",
		"heimdall@asgard.com",
		"2020-08-08",
		"hhe",
		"https://cdn.vox-cdn.com/thumbor/G99dGM7X_R1gjLV7OF-bPuoP4GY=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/18969934/Screen_Shot_2019_08_13_at_3.47.16_PM.png",
		undefined as unknown as Dish[],
		undefined as unknown as Ingredient[],
		undefined as unknown as UserGroup[],
		undefined as unknown as Vote[],
		undefined as unknown as ShoppingList[]
	);

	let userD = new User(
		"8c957413-2cb6-46af-8f47-816c6a183cd1",
		"Odin",
		"Wodan",
		"odin@asgard.com",
		"2020-08-08",
		"owo",
		"https://image.freepik.com/vektoren-kostenlos/odin-vektor-logo_43623-397.jpg",
		undefined as unknown as Dish[],
		undefined as unknown as Ingredient[],
		undefined as unknown as UserGroup[],
		undefined as unknown as Vote[],
		undefined as unknown as ShoppingList[]
	);

	let userE = new User(
		"3a2f5fdf-8b00-4b33-bd73-689a6544f027",
		"Freya",
		"Freia",
		"freya@asgard.com",
		"2020-08-08",
		"owo",
		"https://i.etsystatic.com/10036582/r/il/fd9f8e/1296541546/il_570xN.1296541546_98xd.jpg",
		undefined as unknown as Dish[],
		undefined as unknown as Ingredient[],
		undefined as unknown as UserGroup[],
		undefined as unknown as Vote[],
		undefined as unknown as ShoppingList[]
	);

	let groupA = new Group(
		"2985167a-f0dd-408c-a392-0b0a76b9b94d",
		"toeftebois",
		"2021-03-09",
		undefined as unknown as UserGroup[],
		inv,
		lists,
		wishes
	);

	let ugA = new UserGroup(
		"0530c310-ddc9-4c25-a262-000a43c7e018",
		"2020-08-09",
		"member",
		userA,
		groupA
	);

	let ugB = new UserGroup(
		"dbf36590-8163-4dd6-802b-90aafde431a8",
		"2020-08-09",
		"member",
		userB,
		groupA
	);

	let ugC = new UserGroup(
		"5555da1b-271d-4430-9fa5-c34eb658db73",
		"2020-08-09",
		"admin",
		userC,
		groupA
	);

	let ugD = new UserGroup(
		"b375702a-716d-47d4-a4d6-7e9ba71b21ba",
		"2020-08-09",
		"member",
		userD,
		groupA
	);

	let ugE = new UserGroup(
		"4a253a74-fcfe-4303-8b23-e992435ec061",
		"2020-08-09",
		"admin",
		userE,
		groupA
	);

	userA.userGroups = [ugA];
	userB.userGroups = [ugB];
	userC.userGroups = [ugC];
	userD.userGroups = [ugD];
	userE.userGroups = [ugE];

	groupA.userGroups = [
		ugA,
		ugB,
		ugC,
		ugD,
		ugE
	];

	let ingrdA = new Ingredient(
		"7468466f-12da-4da4-83b0-fa0ca578c4e2",
		"Paprika",
		userA,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	);

	let ingrdB = new Ingredient(
		"9326354a-f5c5-4943-b7c5-c0d6bf845a0f",
		"Zwiebel",
		userA,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	);

	let ingrdC = new Ingredient(
		"62d691dd-32f6-40c3-8638-d8fa5cd71581",
		"Haehnchenbrustfilet",
		userA,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	);

	let ingrdD = new Ingredient(
		"b63dfa9b-c604-4dcb-b313-581e501bab72",
		"Schmand",
		userA,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	);

	let ingrdE = new Ingredient(
		"b152564c-7f41-46c7-971c-099afada5770",
		"Sahne",
		userA,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	);

	let ingrdF = new Ingredient(
		"3b957369-0631-403f-ada8-5cbbe5c99e3a",
		"Emmentaler gerieben",
		userA,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	);

	let ingrdG = new Ingredient(
		"2b2c8e02-34ed-4f2f-8e82-a9e9f21989e1",
		"Kartoffel",
		userD,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	);

	let ingrdH = new Ingredient(
		"7a7f0221-064e-4a64-ac11-83189ef8f6b0",
		"Zwiebel",
		userD,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	);

	let ingrdI = new Ingredient(
		"ba657d12-90fe-4c8f-af81-0e46acfba44d",
		"Oel", //murica invading
		userD,
		undefined as unknown as DishIngredient[],
		undefined as unknown as ShoppingListIngredient[]
	)

	let dishA = new Dish(
		"66fcfc11-da4a-4d50-9254-e9e9042c9c42",
		"Paprika-Haehnchen Auflauf",
		userA,
		undefined as unknown as DishIngredient[],
		undefined as unknown as Wish[]
	);

	let dishB = new Dish(
		"b3029200-5379-4254-835e-9ea49fddeded",
		"Bratkartoffeln",
		userD,
		undefined as unknown as DishIngredient[],
		undefined as unknown as Wish[]
	);

	let diA = new DishIngredient(
		"94b9afa3-3c03-4e2a-944f-17f2d30c7191",
		dishA,
		ingrdA,
		200,
		"gramm"
	);

	let diB = new DishIngredient(
		"56115f58-0cee-4298-91d2-fbc049fe4e0c",
		dishA,
		ingrdB,
		200,
		"gramm"
	);

	let diC = new DishIngredient(
		"5ec73635-988b-4681-a54c-02c2fa76ca76",
		dishA,
		ingrdC,
		1,
		"kilogramm"
	);

	let diD = new DishIngredient(
		"3de8cd5d-db83-426b-94a9-42a14951897c",
		dishA,
		ingrdD,
		400,
		"gramm"
	);

	let diE = new DishIngredient(
		"cbd6ceb1-393f-448e-9250-52033f589ea0",
		dishA,
		ingrdE,
		200,
		"gramm"
	);

	let diF = new DishIngredient(
		"3fbd04f1-92d5-447a-b0bf-348a73082625",
		dishA,
		ingrdF,
		250,
		"gramm"
	);

	let diG = new DishIngredient(
		"80040453-7de4-490b-a457-04b99ef52cab",
		dishB,
		ingrdG,
		1,
		"kilogramm"
	);

	let diH = new DishIngredient(
		"6c78a45d-d98b-421e-9eef-2c3968afa2c7",
		dishB,
		ingrdH,
		500,
		"gramm"
	);

	let diI = new DishIngredient(
		"5a360d49-141d-438c-b86b-6f43d518ef2b",
		dishB,
		ingrdI,
		50,
		"gramm"
	);

	ingrdA.dishIngredients = [diA];
	ingrdB.dishIngredients = [diB];
	ingrdC.dishIngredients = [diC];
	ingrdD.dishIngredients = [diD];
	ingrdE.dishIngredients = [diE];
	ingrdF.dishIngredients = [diF];
	ingrdG.dishIngredients = [diG];
	ingrdH.dishIngredients = [diH];
	ingrdI.dishIngredients = [diI];

	dishA.dishIngredients = [
		diA, diB, diC, diD, diE, diF
	];
	dishB.dishIngredients = [
		diG, diH, diI
	];

	userA.ingredients = [
		ingrdA, ingrdB, ingrdC, ingrdD, ingrdE
	];
	userB.ingredients = [];
	userC.ingredients = [];
	userD.ingredients = [
		ingrdF, ingrdG, ingrdH
	];
	userE.ingredients = [];

	userA.dishes = [
		dishA
	];
	userB.dishes = [];
	userC.dishes = [];
	userD.dishes = [
		dishB
	];
	userE.dishes = [];

	let shoppingListA = new ShoppingList(
		"09f6ec3f-05e1-48a8-859a-d14d33506312",
		"PHA Einkaufsliste",
		false,
		userA,
		undefined as unknown as ShoppingListIngredient[],
		groupA
	);

	let sliA = new ShoppingListIngredient(
		"06694575-07dc-45bf-9b3b-0ae5d8544a5a",
		shoppingListA,
		ingrdA,
		200,
		"gramm"
	);

	let sliB = new ShoppingListIngredient(
		"2bc81935-ed05-47e6-8903-576ca14bf7c2",
		shoppingListA,
		ingrdB,
		200,
		"gramm"
	);

	let sliC = new ShoppingListIngredient(
		"206adbc3-a473-49f0-aaf3-4640d7d4e556",
		shoppingListA,
		ingrdC,
		1,
		"kilogramm"
	);

	let sliD = new ShoppingListIngredient(
		" b5328bc3-54bb-4f4a-9b86-12086f532879",
		shoppingListA,
		ingrdD,
		400,
		"gramm"
	);

	let sliE = new ShoppingListIngredient(
		"5d4451c1-55cd-4479-a5ea-667556e1fa06",
		shoppingListA,
		ingrdE,
		200,
		"gramm"
	);

	let sliF = new ShoppingListIngredient(
		"a8405910-27b9-447f-8c6a-13865ca8cfb8",
		shoppingListA,
		ingrdF,
		250,
		"gramm"
	);

	let sliG = new ShoppingListIngredient(
		"f36f3186-f64e-4607-8bce-0f257fe67621",
		shoppingListA,
		ingrdG,
		1,
		"kilogramm"
	);

	let sliH = new ShoppingListIngredient(
		"3e7f463d-8b1a-44f2-aeaf-93c79ffd3af3",
		shoppingListA,
		ingrdH,
		500,
		"gramm"
	);

	let sliI = new ShoppingListIngredient(
		"1d66a872-7fc0-4e32-8149-33bb47c4d98b",
		shoppingListA,
		ingrdI,
		50,
		"gramm"
	);

	ingrdA.shoppingListIngredients = [sliA];
	ingrdB.shoppingListIngredients = [sliB];
	ingrdC.shoppingListIngredients = [sliC];
	ingrdD.shoppingListIngredients = [sliD];
	ingrdE.shoppingListIngredients = [sliE];
	ingrdF.shoppingListIngredients = [sliF];
	ingrdG.shoppingListIngredients = [sliG];
	ingrdH.shoppingListIngredients = [sliH];
	ingrdI.shoppingListIngredients = [sliI];

	shoppingListA.shoppingListIngredients = [
		sliA, sliB, sliC, sliD, sliE, sliF, sliG, sliH, sliI
	];

	userA.lists = [ shoppingListA ];
	userB.lists = [];
	userC.lists = [];
	userD.lists = [];
	userE.lists = [];

	groupA.lists = [ shoppingListA ];

	let wishA = new Wish(
		"58b3b01f-489a-44f3-9889-0e2445b23097",
		"lunch",
		"2021-03-11",
		userA,
		dishA,
		groupA,
		undefined as unknown as Vote[],
	);

	let wishB = new Wish(
		"7637b9c1-c4b1-447d-ad1c-5780ed75e261",
		"morning",
		"2021-03-11",
		userD,
		dishB,
		groupA,
		undefined as unknown as Vote[]
	);

	let wvA = new Vote(
		"e8fab827-b868-49ea-a92d-3a52caffa80f",
		1,
		userA,
		wishA
	);

	let wvB = new Vote(
		"81ccc911-be0a-4b3a-b19f-1bb0c93373c3",
		0,
		userB,
		wishA
	);

	let wvC = new Vote(
		"da4a64e0-2f7a-4db5-8f19-64c71f0d13ac",
		1,
		userC,
		wishB
	);

	let wvD = new Vote(
		"43f8a6ff-e108-41cc-a509-a854b53ef118",
		1,
		userD,
		wishB
	);

	let wvE = new Vote(
		"f479ec09-34fd-4814-817d-f610a2caa706",
		0,
		userE,
		wishB
	);

	wishA.votes = [
		wvA, wvB
	];
	wishB.votes = [
		wvC, wvD, wvE
	];

	userA.votes = [ wvA ];
	userB.votes = [ wvB ];
	userC.votes = [ wvC ];
	userD.votes = [ wvD ];
	userE.votes = [ wvE ];

	// TODO persist objects
	await connection.manager.save(userE);
	console.log("Created sample data!");
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
