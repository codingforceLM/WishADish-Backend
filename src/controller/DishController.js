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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var Dish_1 = require("../model/food/dish/Dish");
var Ingredient_1 = require("../model/food/ingredients/Ingredient");
var DishIngredient_1 = require("../model/food/dish/DishIngredient");
var User_1 = require("../model/user/User");
var uuidv4 = require('uuid').v4;
var router = express_1.default.Router();
var middleware = require("../middleware/loginsystem");
router.get("/", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, dishes, e_1, json, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.header("userId");
                    if (userId == undefined || userId == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "required field undefined" })];
                    }
                    dishes = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(Dish_1.Dish).find({
                            relations: ["_user"],
                            where: { _user: userId },
                            order: { _title: "ASC" }
                        })];
                case 2:
                    // @ts-ignore
                    dishes = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 4:
                    if (dishes == undefined || dishes == []) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    json = [];
                    for (i = 0; i < dishes.length; i++) {
                        json.push({
                            "id": dishes[i].id,
                            "name": dishes[i].title
                        });
                    }
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.get("/:id", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var dishId, dishes, e_2, dish, json, i, ingredient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dishId = req.params.id;
                    if (dishId == undefined || dishId == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "required field undefined" })];
                    }
                    dishes = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(DishIngredient_1.DishIngredient).find({
                            relations: ["_dish", "_ingredient"],
                            where: { _dish: dishId }
                        })];
                case 2:
                    dishes = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 4:
                    if (dishes == undefined || dishes == [] || dishes.length == 0) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    dish = dishes[0].dish;
                    json = {
                        "id": dish.id,
                        "name": dish.title,
                        "ingredients": Array()
                    };
                    for (i = 0; i < dishes.length; i++) {
                        ingredient = dishes[i].ingredient;
                        json.ingredients.push({
                            "id": ingredient.id,
                            "name": ingredient.title,
                            "amount": dishes[i].amount,
                            "unit": dishes[i].unit
                        });
                    }
                    // @ts-ignore
                    json.ingredients.sort(function (a, b) { return (a["name"] > b["name"] ? 1 : -1); });
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.post("/", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, ingridientsparam, userId, user, e_3, ingredients, i, ingrd, idmiss, ammiss, unmiss, missing, dish, dis, i, ingrd, qIngrd, e_4, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.header("name");
                    ingridientsparam = req.header("ingredients");
                    userId = req.header("userId");
                    if (name == undefined || name == "" || ingridientsparam == undefined || ingridientsparam == "" || userId == undefined || userId == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "required field undefined" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User).findOne({
                            where: { _id: userId }
                        })];
                case 2:
                    user = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 4:
                    if (user == null) {
                        return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                    }
                    try {
                        ingredients = JSON.parse(ingridientsparam);
                    }
                    catch (e) {
                        console.log(e);
                        return [2 /*return*/, res.status(400).json({ "error": "couldnt parse ingredients json" })];
                    }
                    for (i = 0; i < ingredients.length; i++) {
                        ingrd = ingredients[i];
                        idmiss = true;
                        ammiss = true;
                        unmiss = true;
                        if (ingrd.hasOwnProperty("id")) {
                            idmiss = false;
                        }
                        if (ingrd.hasOwnProperty("amount")) {
                            ammiss = false;
                        }
                        if (ingrd.hasOwnProperty("unit")) {
                            unmiss = false;
                        }
                        if (idmiss || ammiss || unmiss) {
                            missing = (!idmiss ? "" : "id, ") + (!ammiss ? "" : "amount, ") + (!unmiss ? "" : "unit");
                            return [2 /*return*/, res.status(400).json({ "error": "object " + i + " is missing " + missing })];
                        }
                    }
                    dish = new Dish_1.Dish(uuidv4(), name, user, undefined, undefined);
                    dis = [];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < ingredients.length)) return [3 /*break*/, 11];
                    ingrd = ingredients[i];
                    qIngrd = void 0;
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(Ingredient_1.Ingredient).findOne({
                            where: { _id: ingrd.id }
                        })];
                case 7:
                    qIngrd = (_a.sent());
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown ingredientId " + ingrd.id })];
                case 9:
                    if (qIngrd == null) {
                        return [2 /*return*/, res.status(400).json({ "error": "Unknown ingredientId " + ingrd.id })];
                    }
                    dis.push(new DishIngredient_1.DishIngredient(uuidv4(), dish, qIngrd, ingrd.amount, ingrd.unit));
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 5];
                case 11:
                    dish.dishIngredients = dis;
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(Dish_1.Dish).manager.save(dish)];
                case 12:
                    _a.sent();
                    json = {
                        "msg": "Dish created",
                    };
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.put("/", middleware.isLoggedIn, function (req, res) {
    var dishId = req.header("dishId");
    var name = req.header("name");
    var ingridients = req.header("ingridients");
    if (dishId == undefined || dishId == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "Wish updated",
        "arguments": {
            "dishId": dishId,
            "name": name,
            "ingridients": ingridients
        }
    };
    return res.status(200).json(json);
});
router.delete("/", middleware.isLoggedIn, function (req, res) {
    var dishId = req.header("dishId");
    if (dishId == undefined || dishId == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "Wish deleted",
        "arguments": {
            "dishId": dishId
        }
    };
    return res.status(200).json(json);
});
module.exports = router;
