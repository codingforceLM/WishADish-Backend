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
var loginController = require("./controller/LoginController");
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
    var inv, lists, wishes, userA, userB, userC, userD, userE, groupA, ugA, ugB, ugC, ugD, ugE, ingrdA, ingrdB, ingrdC, ingrdD, ingrdE, ingrdF, ingrdG, ingrdH, ingrdI, dishA, dishB, diA, diB, diC, diD, diE, diF, diG, diH, diI, shoppingListA, shoppingListB, sliA, sliB, sliC, sliD, sliE, sliF, sliG, sliH, sliI, slibA, wishA, wishB, wvA, wvB, wvC, wvD, wvE;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Connection established!");
                console.log("Creating example data!");
                inv = [];
                lists = [];
                wishes = [];
                userA = new User_1.User("8bdb8aed-e579-4b25-a16a-9cf219572ca7", "Thor", "Odinson", "thor@asgard.com", "todpw", "2020-08-08", "tod", undefined, "https://static.wikia.nocookie.net/avengers/images/4/48/Thor_Gladiator.jpg/revision/latest/top-crop/width/360/height/360?cb=20171105082329&path-prefix=de", undefined, undefined, undefined, undefined, undefined);
                userB = new User_1.User("3cb7d028-5629-442c-bd17-24689115694c", "Loki", "Odinson", "loki@asgard.com", "lodpw", "2020-08-08", "lod", undefined, "https://static.wikia.nocookie.net/antagonisten/images/2/2d/The-avengers-loki.jpg/revision/latest?cb=20170506225328&path-prefix=de", undefined, undefined, undefined, undefined, undefined);
                userC = new User_1.User("40eca8dd-d3c4-47ae-9b95-8f57cb9d8185", "Heimdall", "Heimr", "heimdall@asgard.com", "lodpw", "2020-08-08", "hhe", undefined, "https://cdn.vox-cdn.com/thumbor/G99dGM7X_R1gjLV7OF-bPuoP4GY=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/18969934/Screen_Shot_2019_08_13_at_3.47.16_PM.png", undefined, undefined, undefined, undefined, undefined);
                userD = new User_1.User("8c957413-2cb6-46af-8f47-816c6a183cd1", "Odin", "Wodan", "odin@asgard.com", "owopw", "2020-08-08", "owo", undefined, "https://image.freepik.com/vektoren-kostenlos/odin-vektor-logo_43623-397.jpg", undefined, undefined, undefined, undefined, undefined);
                userE = new User_1.User("3a2f5fdf-8b00-4b33-bd73-689a6544f027", "Freya", "Freia", "freya@asgard.com", "ffrpw", "2020-08-08", "ffr", undefined, "https://i.etsystatic.com/10036582/r/il/fd9f8e/1296541546/il_570xN.1296541546_98xd.jpg", undefined, undefined, undefined, undefined, undefined);
                groupA = new Group_1.Group("2985167a-f0dd-408c-a392-0b0a76b9b94d", "toeftebois", "2021-03-09", undefined, inv, lists, wishes);
                ugA = new UserGroup_1.UserGroup("0530c310-ddc9-4c25-a262-000a43c7e018", "2020-08-09", "member", userA, groupA);
                ugB = new UserGroup_1.UserGroup("dbf36590-8163-4dd6-802b-90aafde431a8", "2020-08-09", "member", userB, groupA);
                ugC = new UserGroup_1.UserGroup("5555da1b-271d-4430-9fa5-c34eb658db73", "2020-08-09", "admin", userC, groupA);
                ugD = new UserGroup_1.UserGroup("b375702a-716d-47d4-a4d6-7e9ba71b21ba", "2020-08-09", "member", userD, groupA);
                ugE = new UserGroup_1.UserGroup("4a253a74-fcfe-4303-8b23-e992435ec061", "2020-08-09", "admin", userE, groupA);
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
                diA = new DishIngredient_1.DishIngredient("94b9afa3-3c03-4e2a-944f-17f2d30c7191", dishA, ingrdA, 200, "gramm");
                diB = new DishIngredient_1.DishIngredient("56115f58-0cee-4298-91d2-fbc049fe4e0c", dishA, ingrdB, 200, "gramm");
                diC = new DishIngredient_1.DishIngredient("5ec73635-988b-4681-a54c-02c2fa76ca76", dishA, ingrdC, 1, "kilogramm");
                diD = new DishIngredient_1.DishIngredient("3de8cd5d-db83-426b-94a9-42a14951897c", dishA, ingrdD, 400, "gramm");
                diE = new DishIngredient_1.DishIngredient("cbd6ceb1-393f-448e-9250-52033f589ea0", dishA, ingrdE, 200, "gramm");
                diF = new DishIngredient_1.DishIngredient("3fbd04f1-92d5-447a-b0bf-348a73082625", dishA, ingrdF, 250, "gramm");
                diG = new DishIngredient_1.DishIngredient("80040453-7de4-490b-a457-04b99ef52cab", dishB, ingrdG, 1, "kilogramm");
                diH = new DishIngredient_1.DishIngredient("6c78a45d-d98b-421e-9eef-2c3968afa2c7", dishB, ingrdH, 500, "gramm");
                diI = new DishIngredient_1.DishIngredient("5a360d49-141d-438c-b86b-6f43d518ef2b", dishB, ingrdI, 50, "gramm");
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
                shoppingListA = new ShoppingList_1.ShoppingList("09f6ec3f-05e1-48a8-859a-d14d33506312", "PHA Einkaufsliste", false, userA, undefined, groupA);
                shoppingListB = new ShoppingList_1.ShoppingList("05511be6-e417-482d-b543-571062d42b92", "BA Einkaufsliste", false, userD, undefined, groupA);
                sliA = new ShoppingListIngredient_1.ShoppingListIngredient("06694575-07dc-45bf-9b3b-0ae5d8544a5a", shoppingListA, ingrdA, 200, "gramm", false);
                sliB = new ShoppingListIngredient_1.ShoppingListIngredient("2bc81935-ed05-47e6-8903-576ca14bf7c2", shoppingListA, ingrdB, 200, "gramm", false);
                sliC = new ShoppingListIngredient_1.ShoppingListIngredient("206adbc3-a473-49f0-aaf3-4640d7d4e556", shoppingListA, ingrdC, 1, "kilogramm", true);
                sliD = new ShoppingListIngredient_1.ShoppingListIngredient(" b5328bc3-54bb-4f4a-9b86-12086f532879", shoppingListA, ingrdD, 400, "gramm", false);
                sliE = new ShoppingListIngredient_1.ShoppingListIngredient("5d4451c1-55cd-4479-a5ea-667556e1fa06", shoppingListA, ingrdE, 200, "gramm", true);
                sliF = new ShoppingListIngredient_1.ShoppingListIngredient("a8405910-27b9-447f-8c6a-13865ca8cfb8", shoppingListA, ingrdF, 250, "gramm", false);
                sliG = new ShoppingListIngredient_1.ShoppingListIngredient("f36f3186-f64e-4607-8bce-0f257fe67621", shoppingListA, ingrdG, 1, "kilogramm", false);
                sliH = new ShoppingListIngredient_1.ShoppingListIngredient("3e7f463d-8b1a-44f2-aeaf-93c79ffd3af3", shoppingListA, ingrdH, 500, "gramm", false);
                sliI = new ShoppingListIngredient_1.ShoppingListIngredient("1d66a872-7fc0-4e32-8149-33bb47c4d98b", shoppingListA, ingrdI, 50, "gramm", true);
                slibA = new ShoppingListIngredient_1.ShoppingListIngredient("62fe484d-154c-4621-b323-d9f54cfc6675", shoppingListB, ingrdB, 1, "kilogramm", false);
                ingrdA.shoppingListIngredients = [sliA];
                ingrdB.shoppingListIngredients = [sliB, slibA];
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
                shoppingListB.shoppingListIngredients = [
                    slibA
                ];
                userA.lists = [shoppingListA];
                userB.lists = [];
                userC.lists = [];
                userD.lists = [shoppingListB];
                userE.lists = [];
                groupA.lists = [shoppingListA];
                wishA = new Wish_1.Wish("58b3b01f-489a-44f3-9889-0e2445b23097", "lunch", "2021-03-11", userA, dishA, groupA, undefined);
                wishB = new Wish_1.Wish("7637b9c1-c4b1-447d-ad1c-5780ed75e261", "morning", "2021-03-11", userD, dishB, groupA, undefined);
                wvA = new Vote_1.Vote("e8fab827-b868-49ea-a92d-3a52caffa80f", 1, userA, wishA);
                wvB = new Vote_1.Vote("81ccc911-be0a-4b3a-b19f-1bb0c93373c3", 0, userB, wishA);
                wvC = new Vote_1.Vote("da4a64e0-2f7a-4db5-8f19-64c71f0d13ac", 1, userC, wishB);
                wvD = new Vote_1.Vote("43f8a6ff-e108-41cc-a509-a854b53ef118", 1, userD, wishB);
                wvE = new Vote_1.Vote("f479ec09-34fd-4814-817d-f610a2caa706", 0, userE, wishB);
                wishA.votes = [
                    wvA, wvB
                ];
                wishB.votes = [
                    wvC, wvD, wvE
                ];
                userA.votes = [wvA];
                userB.votes = [wvB];
                userC.votes = [wvC];
                userD.votes = [wvD];
                userE.votes = [wvE];
                // TODO persist objects
                return [4 /*yield*/, connection.manager.save(userE)];
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
app.use("/api/login", loginController);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
