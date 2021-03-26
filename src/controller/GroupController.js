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
var UserGroup_1 = require("../model/user/UserGroup");
var User_1 = require("../model/user/User");
var Group_1 = require("../model/user/group/Group");
var middleware = require("../middleware/loginsystem");
var router = express_1.default.Router();
var uuidv4 = require('uuid').v4;
router.get("/", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, results, e_1, json, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.header("userId");
                    if (userId == undefined || userId == "") {
                        return [2 /*return*/, res.status(400).json({ "error": "required field undefined" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(UserGroup_1.UserGroup).find({
                            relations: ['_group', '_user'],
                            where: { _user: userId }
                        })];
                case 2:
                    results = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 4:
                    if (results == undefined || results == []) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    json = [];
                    for (i = 0; i < results.length; i++) {
                        json.push({
                            "id": results[i].group.id,
                            "title": results[i].group.title,
                            "creation": results[i].group.creation
                        });
                    }
                    // @ts-ignore
                    json.sort(function (a, b) { return (a["title"] > b["title"] ? 1 : -1); });
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.get("/:id", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var groupId, results, e_2, json, userlist, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groupId = req.params.id;
                    if (groupId == undefined || groupId == "") {
                        return [2 /*return*/, res.status(400).json({ "error": "required field undefined" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(UserGroup_1.UserGroup).find({
                            relations: ['_group', '_user'],
                            where: { _group: groupId }
                        })];
                case 2:
                    results = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 4:
                    if (results == undefined || results == [] || results.length == 0) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    json = {};
                    userlist = [];
                    for (i = 0; i < results.length; i++) {
                        userlist.push({
                            "id": results[i].user.id,
                            "name": results[i].user.firstname + " " + results[i].user.lastname,
                            "role": results[i].role,
                            "fileurl": results[i].user.fileurl
                        });
                    }
                    json = {
                        "id": results[0].group.id,
                        "name": results[0].group.title,
                        "user": userlist
                    };
                    // @ts-ignore
                    json.sort(function (a, b) { return (a["title"] > b["title"] ? 1 : -1); });
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.post("/", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, userId, user, e_3, date, dd, mm, yyyy, group, userGroup, e_4, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.header("name");
                    userId = req.header("userId");
                    if (name == undefined || name == "" || userId == undefined || userId == "") {
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
                    if (user == undefined) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    date = new Date();
                    dd = String(date.getDate()).padStart(2, '0');
                    mm = String(date.getMonth() + 1).padStart(2, '0');
                    yyyy = date.getFullYear();
                    group = new Group_1.Group(uuidv4(), name, yyyy + "-" + mm + "-" + dd, undefined, undefined, undefined, undefined);
                    userGroup = new UserGroup_1.UserGroup(uuidv4(), yyyy + "-" + mm + "-" + dd, "admin", user, group);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 8, , 9]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(Group_1.Group).manager.save(group)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(Group_1.Group).manager.save(userGroup)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                case 9:
                    json = {
                        "msg": "Group created"
                    };
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.delete("/", middleware.isLoggedIn, function (req, res) {
    var id = req.header("id");
    if (id == undefined || id == "") {
        return res.status(404).json({ "error": "ID unknown" });
    }
    //database res.status(400).json({"error": "Id couldnt be processed"})
    var json = {
        "msg": "Group deleted",
        "arguments": {
            "name": id
        }
    };
    return res.status(200).json(json);
});
router.put("/:id", middleware.isLoggedIn, function (req, res) {
    var id = req.params.id;
    var user = req.header("user");
    if (id == undefined || id == "") {
        return res.status(404).json({ "error": "ID unknown" });
    }
    if (user == undefined || user == "") {
        return res.status(400).json({ "error": "required field undefined" });
    }
    var json = {
        "msg": "Group updated",
        "arguments": {
            "name": id,
            "user": user
        }
    };
    return res.status(200).json(json);
});
module.exports = router;
