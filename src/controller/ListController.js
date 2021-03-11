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
var index_1 = require("typeorm/index");
var ShoppingList_1 = require("../model/shoppinglist/ShoppingList");
var ShoppingListIngredient_1 = require("../model/shoppinglist/ShoppingListIngredient");
var router = express_1.default.Router();
router.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var groupId, done, lists, json, e_1, i, result, e_2, ingrd, i_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groupId = req.header("groupId");
                    done = req.header("done");
                    if (groupId == undefined || groupId == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "required field undefined" })];
                    }
                    json = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!(done == "true")) return [3 /*break*/, 3];
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingList_1.ShoppingList).find({
                            where: { _group: groupId,
                                _done: false }
                        })];
                case 2:
                    lists = (_a.sent());
                    _a.label = 3;
                case 3: return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingList_1.ShoppingList).find({
                        where: { _group: groupId }
                    })];
                case 4:
                    lists = (_a.sent());
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown groupId" })];
                case 6:
                    if (lists == undefined || lists == []) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < lists.length)) return [3 /*break*/, 13];
                    result = void 0;
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(ShoppingListIngredient_1.ShoppingListIngredient).find({
                            relations: ['_ingredient'],
                            where: { _list: lists[i] }
                        })];
                case 9:
                    result = (_a.sent());
                    return [3 /*break*/, 11];
                case 10:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown groupId" })];
                case 11:
                    if (result == undefined || result == []) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    ingrd = [];
                    for (i_1 = 0; i_1 < result.length; i_1++) {
                        ingrd.push({
                            'id': result[i_1].ingredient.id,
                            'name': result[i_1].ingredient.title,
                            'done': "missing"
                        });
                    }
                    json.push({
                        'id': lists[i].id,
                        'name': lists[i].title,
                        'ingredients': ingrd
                    });
                    _a.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 7];
                case 13: return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.post("/", function (req, res) {
    var name = req.header("name");
    var groupId = req.header("groupId");
    if (name == undefined || name == "" || groupId == undefined || groupId == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "List created",
        "arguments": {
            "name": name,
            "groupId": groupId
        }
    };
    return res.status(200).json(json);
});
router.put("/", function (req, res) {
    var id = req.header("id");
    var name = req.header("name");
    var ingredients = req.header("ingredients");
    if (id == undefined || id == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "List updated",
        "arguments": {
            "id": id,
            "name": name,
            "ingredients": ingredients
        }
    };
    return res.status(200).json(json);
});
router.delete("/", function (req, res) {
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
