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
var ShoppingList_1 = require("../model/shoppinglist/ShoppingList");
var ShoppingListIngredient_1 = require("../model/shoppinglist/ShoppingListIngredient");
var index_1 = require("typeorm/index");
var typeorm_1 = require("typeorm");
var User_1 = require("../model/user/User");
var Group_1 = require("../model/user/group/Group");
var UserGroup_1 = require("../model/user/UserGroup");
var uuidv4 = require('uuid').v4;
var middleware = require("../middleware/loginsystem");
var router = express_1.default.Router();
router.get("/", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, done, results_ug, e_1, groupIds, i, lists, json, e_2, i, result, e_3, ingrd, i_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.header("userId");
                    done = req.header("done");
                    if (userId == undefined || userId == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "required field undefined" })];
                    }
                    results_ug = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(UserGroup_1.UserGroup).find({
                            relations: ['_group'],
                            where: { _user: userId }
                        })];
                case 2:
                    results_ug = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown groupId" })];
                case 4:
                    if (results_ug == undefined || results_ug == [] || results_ug.length == 0) {
                        return [2 /*return*/, res.status(200).json([])];
                    }
                    groupIds = [];
                    for (i = 0; i < results_ug.length; i++) {
                        groupIds.push(results_ug[i].group.id);
                    }
                    json = [];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 10, , 11]);
                    if (!(done == "true")) return [3 /*break*/, 7];
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingList_1.ShoppingList).find({
                            where: { _group: typeorm_1.In(groupIds), _done: Number(0) }
                        })];
                case 6:
                    lists = (_a.sent());
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingList_1.ShoppingList).find({
                        where: { _group: typeorm_1.In(groupIds) }
                    })];
                case 8:
                    lists = (_a.sent());
                    _a.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown groupId" })];
                case 11:
                    if (lists == undefined || lists == [] || lists.length == 0) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    i = 0;
                    _a.label = 12;
                case 12:
                    if (!(i < lists.length)) return [3 /*break*/, 18];
                    result = void 0;
                    _a.label = 13;
                case 13:
                    _a.trys.push([13, 15, , 16]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingListIngredient_1.ShoppingListIngredient).find({
                            relations: ['_ingredient'],
                            where: { _list: lists[i] }
                        })];
                case 14:
                    result = (_a.sent());
                    return [3 /*break*/, 16];
                case 15:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown groupId" })];
                case 16:
                    if (result == undefined || result == []) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    ingrd = [];
                    for (i_1 = 0; i_1 < result.length; i_1++) {
                        ingrd.push({
                            'id': result[i_1].ingredient.id,
                            'name': result[i_1].ingredient.title,
                            'done': result[i_1].done
                        });
                    }
                    json.push({
                        'id': lists[i].id,
                        'name': lists[i].title,
                        'ingredients': ingrd
                    });
                    _a.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 12];
                case 18: return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.get("/:id", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, result, e_4, json, results_sli, e_5, i, ingrd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    if (id == undefined || id.trim() == "") {
                        return [2 /*return*/, res.status(400).json({ "error": "required field undefined" })];
                    }
                    result = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingList_1.ShoppingList).findOne({
                            where: { _id: id }
                        })];
                case 2:
                    result = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown id" })];
                case 4:
                    if (result == undefined) {
                        return [2 /*return*/, res.status(400).json({ "error": "Unknown id" })];
                    }
                    json = {
                        "id": result.id,
                        "name": result.title,
                        "done": result.done,
                        "ingredients": []
                    };
                    results_sli = undefined;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingListIngredient_1.ShoppingListIngredient).find({
                            relations: ['_ingredient'],
                            where: { _list: result.id }
                        })];
                case 6:
                    results_sli = (_a.sent());
                    return [3 /*break*/, 8];
                case 7:
                    e_5 = _a.sent();
                    console.log(e_5);
                    return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                case 8:
                    if (results_sli == [] || results_sli.length == 0) {
                        json.ingredients = [];
                    }
                    for (i = 0; i < results_sli.length; i++) {
                        ingrd = results_sli[i].ingredient;
                        json.ingredients.push({
                            "id": ingrd.id,
                            "name": ingrd.title,
                            "amount": results_sli[i].ammount,
                            "unit": results_sli[i].unit,
                            "done": results_sli[i].done
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
        var name, groupId, userId, user, group, e_6, list, e_7, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.header("name");
                    groupId = req.header("groupId");
                    userId = req.header("userId");
                    if (name == undefined || name == "" || groupId == undefined || groupId == "" || userId == undefined || userId == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "required field undefined" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(User_1.User).findOne({
                            where: { _id: userId }
                        })];
                case 2:
                    user = (_a.sent());
                    return [4 /*yield*/, index_1.getConnection().getRepository(Group_1.Group).findOne({
                            where: { _id: groupId }
                        })];
                case 3:
                    group = (_a.sent());
                    return [3 /*break*/, 5];
                case 4:
                    e_6 = _a.sent();
                    console.log(e_6);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 5:
                    if (user == undefined || group == undefined) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    list = new ShoppingList_1.ShoppingList(uuidv4(), name, false, user, undefined, group);
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingList_1.ShoppingList).manager.save(list)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_7 = _a.sent();
                    console.log(e_7);
                    return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                case 9:
                    json = {
                        "msg": "List created"
                    };
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.put("/", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var shoppinglist, name, done, slJson, slEntity, e_8, ingredients, e_9, e_10, newIngredients, i, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shoppinglist = req.header("shoppinglist");
                    name = req.header("name");
                    done = req.header("done");
                    slJson = [];
                    if (shoppinglist == undefined || shoppinglist == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "required field undefined" })];
                    }
                    try {
                        if (shoppinglist != null) {
                            slJson = JSON.parse(shoppinglist);
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                    slEntity = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingList_1.ShoppingList).findOne({
                            where: { _id: slJson.id }
                        })];
                case 2:
                    slEntity = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_8 = _a.sent();
                    console.log(e_8);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown id" })];
                case 4:
                    if (slEntity == undefined) {
                        return [2 /*return*/, res.status(400).json({ "error": "Unknown id" })];
                    }
                    if (name != undefined && name != "") {
                        slEntity.title = name;
                    }
                    if (done != undefined && done != "") {
                        slEntity.done = ((done == "true") ? true : false);
                    }
                    ingredients = undefined;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingListIngredient_1.ShoppingListIngredient).find({
                            relations: ['_ingredient'],
                            where: { _list: slJson.id }
                        })];
                case 6:
                    ingredients = (_a.sent());
                    return [3 /*break*/, 8];
                case 7:
                    e_9 = _a.sent();
                    console.log(e_9);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown id" })];
                case 8:
                    if (ingredients == undefined) {
                        return [2 /*return*/, res.status(400).json({ "error": "Unknown id" })];
                    }
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingListIngredient_1.ShoppingListIngredient).manager.remove(ingredients)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    e_10 = _a.sent();
                    console.log(e_10);
                    return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                case 12:
                    newIngredients = [];
                    for (i = 0; i < slJson.ingredients.length; i++) {
                        newIngredients.push(new ShoppingListIngredient_1.ShoppingListIngredient(uuidv4(), slJson.id, slJson.ingredients[i].id, slJson.ingredients[i].amount, slJson.ingredients[i].unit, slJson.ingredients[i].done));
                    }
                    _a.label = 13;
                case 13:
                    _a.trys.push([13, 16, , 17]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingListIngredient_1.ShoppingListIngredient).manager.save(newIngredients)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingList_1.ShoppingList).manager.save(slEntity)];
                case 15:
                    _a.sent();
                    return [3 /*break*/, 17];
                case 16:
                    e_11 = _a.sent();
                    console.log(e_11);
                    return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                case 17: return [2 /*return*/, res.status(200).json({ "msg": "List updated" })];
            }
        });
    });
});
router.delete("/", middleware.isLoggedIn, function (req, res) {
    var id = req.header("id");
    if (id == undefined || id == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "List deleted",
        "arguments": {
            "id": id
        }
    };
    return res.status(200).json(json);
});
module.exports = router;
