"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
typeorm_1.createConnection(ormconfig).then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var inv, userA, userB, userC, userD, userE, groupA, ugA, ugB, ugC, ugD, ugE, ingrdA, ingrdB, ingrdC, ingrdD, ingrdE, ingrdF, ingrdG, ingrdH, ingrdI, dishA, dishB, diA, diB, diC, diD, diE, diF, diG, diH, diI, shoppingListA, sliA, sliB, sliC, sliD, sliE, sliF, sliG, sliH, sliI, wishA, wishB, wvA, wvB, wvC, wvD, wvE;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Connection established!");
                console.log("Creating example data!");
                inv = [];
                userA = new User_1.User("8bdb8aed-e579-4b25-a16a-9cf219572ca7", "Thor", "Odinson", "thor@asgard.com", "2020-08-08", "tod", "https://static.wikia.nocookie.net/avengers/images/4/48/Thor_Gladiator.jpg/revision/latest/top-crop/width/360/height/360?cb=20171105082329&path-prefix=de", undefined, undefined, undefined, undefined, undefined);
                userB = new User_1.User("3cb7d028-5629-442c-bd17-24689115694c", "Loki", "Odinson", "loki@asgard.com", "2020-08-08", "lod", "https://static.wikia.nocookie.net/antagonisten/images/2/2d/The-avengers-loki.jpg/revision/latest?cb=20170506225328&path-prefix=de", undefined, undefined, undefined, undefined, undefined);
                userC = new User_1.User("40eca8dd-d3c4-47ae-9b95-8f57cb9d8185", "Heimdall", "Heimr", "heimdall@asgard.com", "2020-08-08", "hhe", "https://cdn.vox-cdn.com/thumbor/G99dGM7X_R1gjLV7OF-bPuoP4GY=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/18969934/Screen_Shot_2019_08_13_at_3.47.16_PM.png", undefined, undefined, undefined, undefined, undefined);
                userD = new User_1.User("8c957413-2cb6-46af-8f47-816c6a183cd1", "Odin", "Wodan", "odin@asgard.com", "2020-08-08", "owo", "https://image.freepik.com/vektoren-kostenlos/odin-vektor-logo_43623-397.jpg", undefined, undefined, undefined, undefined, undefined);
                userE = new User_1.User("3a2f5fdf-8b00-4b33-bd73-689a6544f027", "Freya", "Freia", "freya@asgard.com", "2020-08-08", "owo", "https://i.etsystatic.com/10036582/r/il/fd9f8e/1296541546/il_570xN.1296541546_98xd.jpg", undefined, undefined, undefined, undefined, undefined);
                groupA = new Group_1.Group("2985167a-f0dd-408c-a392-0b0a76b9b94d", "toeftebois", "2021-03-09", undefined, inv);
                ugA = new UserGroup_1.UserGroup(1, "2020-08-09", "member", userA, groupA);
                ugB = new UserGroup_1.UserGroup(2, "2020-08-09", "member", userB, groupA);
                ugC = new UserGroup_1.UserGroup(3, "2020-08-09", "admin", userC, groupA);
                ugD = new UserGroup_1.UserGroup(4, "2020-08-09", "member", userD, groupA);
                ugE = new UserGroup_1.UserGroup(5, "2020-08-09", "admin", userE, groupA);
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
                ingrdA = new Ingredient_1.Ingredient("7468466f-12da-4da4-83b0-fa0ca578c4e2", "Paprika", userA, undefined, undefined);
                ingrdB = new Ingredient_1.Ingredient("9326354a-f5c5-4943-b7c5-c0d6bf845a0f", "Zwiebel", userA, undefined, undefined);
                ingrdC = new Ingredient_1.Ingredient("62d691dd-32f6-40c3-8638-d8fa5cd71581", "Haehnchenbrustfilet", userA, undefined, undefined);
                ingrdD = new Ingredient_1.Ingredient("b63dfa9b-c604-4dcb-b313-581e501bab72", "Schmand", userA, undefined, undefined);
                ingrdE = new Ingredient_1.Ingredient("b152564c-7f41-46c7-971c-099afada5770", "Sahne", userA, undefined, undefined);
                ingrdF = new Ingredient_1.Ingredient("3b957369-0631-403f-ada8-5cbbe5c99e3a", "Emmentaler gerieben", userA, undefined, undefined);
                ingrdG = new Ingredient_1.Ingredient("2b2c8e02-34ed-4f2f-8e82-a9e9f21989e1", "Kartoffel", userD, undefined, undefined);
                ingrdH = new Ingredient_1.Ingredient("7a7f0221-064e-4a64-ac11-83189ef8f6b0", "Zwiebel", userD, undefined, undefined);
                ingrdI = new Ingredient_1.Ingredient("ba657d12-90fe-4c8f-af81-0e46acfba44d", "Oel", //murica invading
                userD, undefined, undefined);
                dishA = new Dish_1.Dish("66fcfc11-da4a-4d50-9254-e9e9042c9c42", "Paprika-Haehnchen Auflauf", userA, undefined, undefined);
                dishB = new Dish_1.Dish("b3029200-5379-4254-835e-9ea49fddeded", "Bratkartoffeln", userD, undefined, undefined);
                diA = new DishIngredient_1.DishIngredient(1, dishA, ingrdA, 200, "gramm");
                diB = new DishIngredient_1.DishIngredient(2, dishA, ingrdB, 200, "gramm");
                diC = new DishIngredient_1.DishIngredient(3, dishA, ingrdC, 1, "kilogramm");
                diD = new DishIngredient_1.DishIngredient(4, dishA, ingrdD, 400, "gramm");
                diE = new DishIngredient_1.DishIngredient(5, dishA, ingrdE, 200, "gramm");
                diF = new DishIngredient_1.DishIngredient(6, dishA, ingrdF, 250, "gramm");
                diG = new DishIngredient_1.DishIngredient(7, dishB, ingrdG, 1, "kilogramm");
                diH = new DishIngredient_1.DishIngredient(8, dishB, ingrdH, 500, "gramm");
                diI = new DishIngredient_1.DishIngredient(9, dishB, ingrdI, 50, "gramm");
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
                shoppingListA = new ShoppingList_1.ShoppingList("09f6ec3f-05e1-48a8-859a-d14d33506312", "PHA Einkaufsliste", false, userA, undefined);
                sliA = new ShoppingListIngredient_1.ShoppingListIngredient(1, shoppingListA, ingrdA, 200, "gramm");
                sliB = new ShoppingListIngredient_1.ShoppingListIngredient(2, shoppingListA, ingrdB, 200, "gramm");
                sliC = new ShoppingListIngredient_1.ShoppingListIngredient(3, shoppingListA, ingrdC, 1, "kilogramm");
                sliD = new ShoppingListIngredient_1.ShoppingListIngredient(4, shoppingListA, ingrdD, 400, "gramm");
                sliE = new ShoppingListIngredient_1.ShoppingListIngredient(5, shoppingListA, ingrdE, 200, "gramm");
                sliF = new ShoppingListIngredient_1.ShoppingListIngredient(6, shoppingListA, ingrdF, 250, "gramm");
                sliG = new ShoppingListIngredient_1.ShoppingListIngredient(7, shoppingListA, ingrdG, 1, "kilogramm");
                sliH = new ShoppingListIngredient_1.ShoppingListIngredient(8, shoppingListA, ingrdH, 500, "gramm");
                sliI = new ShoppingListIngredient_1.ShoppingListIngredient(9, shoppingListA, ingrdI, 50, "gramm");
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
                userA.lists = [shoppingListA];
                userB.lists = [];
                userC.lists = [];
                userD.lists = [];
                userE.lists = [];
                wishA = new Wish_1.Wish("58b3b01f-489a-44f3-9889-0e2445b23097", userA, dishA, undefined);
                wishB = new Wish_1.Wish("7637b9c1-c4b1-447d-ad1c-5780ed75e261", userD, dishB, undefined);
                wvA = new Vote_1.Vote(1, 1, userA, wishA);
                wvB = new Vote_1.Vote(2, 0, userB, wishA);
                wvC = new Vote_1.Vote(3, 1, userC, wishB);
                wvD = new Vote_1.Vote(4, 1, userD, wishB);
                wvE = new Vote_1.Vote(5, 0, userE, wishB);
                wishA.votes = [
                    wvA, wvB
                ];
                wishB.votes = [
                    wvC, wvD, wvE
                ];
                userA.votes = [wvA];
                userB.votes = [wvA];
                userC.votes = [wvA];
                userD.votes = [wvA];
                userE.votes = [wvA];
                // TODO persist objects
                return [4 /*yield*/, connection.manager.save(userA)];
            case 1:
                // TODO persist objects
                _a.sent();
                console.log("Created sample data!");
                return [2 /*return*/];
        }
    });
}); }).catch(function (error) { return console.log(error); });
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
