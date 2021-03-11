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
var Wish_1 = require("../model/food/dish/Wish");
var Vote_1 = require("../model/user/vote/Vote");
var typeorm_1 = require("typeorm");
var router = express_1.default.Router();
router.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, day, month, results_wish, results_vote, json, date, e_1, i, e_2, vote_positiv, vote_negativ, i_1, e_3, i, e_4, vote_positiv, vote_negativ, i_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.header("userId");
                    day = req.header("day");
                    month = req.header("month");
                    if (userId == undefined || userId == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "required field undefined" })];
                    }
                    json = [];
                    date = new Date();
                    console.log("day   " + day + ";");
                    console.log("month " + month + ";");
                    if (!(day != undefined && day != "")) return [3 /*break*/, 11];
                    if (month == undefined || month == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "month undefined" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(Wish_1.Wish).find({
                            relations: ['_user', '_dish', '_group'],
                            where: 
                            // month march or 3 needs to be 03
                            { _user: userId, _date: typeorm_1.Like(date.getFullYear() + "-" + month + "-" + day) }
                        })];
                case 2:
                    results_wish = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 4:
                    if (results_wish == undefined || results_wish == []) {
                        console.log("e");
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < results_wish.length)) return [3 /*break*/, 11];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(Vote_1.Vote).find({
                            relations: ['_wish'],
                            where: { _wish: results_wish[0].id }
                        })];
                case 7:
                    results_vote = (_a.sent());
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 9:
                    if (results_vote == undefined || results_vote == []) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access1" })];
                    }
                    vote_positiv = 0;
                    vote_negativ = 0;
                    for (i_1 = 0; i_1 < results_vote.length; i_1++) {
                        if (results_vote[i_1].vote == 0) {
                            vote_negativ++;
                        }
                        else {
                            vote_positiv++;
                        }
                    }
                    json.push({
                        "id": results_wish[i].id,
                        "name": results_wish[i].dish.title,
                        "groupname": results_wish[i].group.title,
                        "day": results_wish[i].date,
                        "daytime": results_wish[i].daytime,
                        "votes": { "positive": vote_positiv, "negative": vote_negativ }
                    });
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 5];
                case 11:
                    if (!(month != undefined && month != "")) return [3 /*break*/, 22];
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(Wish_1.Wish).find({
                            relations: ['_user', '_dish', '_group'],
                            where: { _user: userId, _date: typeorm_1.Like(date.getFullYear() + "-" + month + "-%") }
                        })];
                case 13:
                    results_wish = (_a.sent());
                    return [3 /*break*/, 15];
                case 14:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 15:
                    if (results_wish == undefined || results_wish == []) {
                        console.log("e");
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    i = 0;
                    _a.label = 16;
                case 16:
                    if (!(i < results_wish.length)) return [3 /*break*/, 22];
                    _a.label = 17;
                case 17:
                    _a.trys.push([17, 19, , 20]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(Vote_1.Vote).find({
                            relations: ['_wish'],
                            where: { _wish: results_wish[i].id }
                        })];
                case 18:
                    results_vote = (_a.sent());
                    return [3 /*break*/, 20];
                case 19:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 20:
                    if (results_vote == undefined || results_vote == []) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access1" })];
                    }
                    vote_positiv = 0;
                    vote_negativ = 0;
                    for (i_2 = 0; i_2 < results_vote.length; i_2++) {
                        if (results_vote[i_2].vote == 0) {
                            vote_negativ++;
                        }
                        else {
                            vote_positiv++;
                        }
                    }
                    json.push({
                        "id": results_wish[i].id,
                        "name": results_wish[i].dish.title,
                        "groupname": results_wish[i].group.title,
                        "day": results_wish[i].date,
                        "daytime": results_wish[i].daytime,
                        "votes": { "positive": vote_positiv, "negative": vote_negativ }
                    });
                    _a.label = 21;
                case 21:
                    i++;
                    return [3 /*break*/, 16];
                case 22: return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.post("/", function (req, res) {
    var groupId = req.header("groupId");
    var dishId = req.header("dishId");
    var daytime = req.header("daytime");
    if (groupId == undefined || groupId == "" || dishId == undefined || dishId == "" || daytime == undefined || daytime == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "Wish created",
        "arguments": {
            "groupId": groupId,
            "dishId": dishId,
            "daytime": daytime
        }
    };
    return res.status(200).json(json);
});
router.put("/", function (req, res) {
    var wishId = req.header("wishId");
    var groupId = req.header("groupId");
    var dishId = req.header("dishId");
    var daytime = req.header("daytime");
    if (wishId == undefined || wishId == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "Wish updated",
        "arguments": {
            "wishId": wishId,
            "groupId": groupId,
            "dishId": dishId,
            "daytime": daytime
        }
    };
    return res.status(200).json(json);
});
router.delete("/", function (req, res) {
    var wishId = req.header("wishId");
    if (wishId == undefined || wishId == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "Wish deleted",
        "arguments": {
            "wishId": wishId
        }
    };
    return res.status(200).json(json);
});
module.exports = router;
