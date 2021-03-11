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
var index_1 = require("typeorm/index");
var User_1 = require("../model/user/User");
var Group_1 = require("../model/user/group/Group");
var uuidv4 = require('uuid').v4;
var router = express_1.default.Router();
router.get("/", function (req, res) {
    var userId = req.header("userId");
    var done = req.header("done");
    if (userId == undefined || userId == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = [{
            "arguments": {
                "userId": userId,
                "done": done
            }
        },
        {
            "id": "273e8601-beea-414b-a771-7495a8a416d4",
            "name": "Cage's list",
            "ingredients": [
                {
                    "id": "b625bcbc-a085-4f88-9ae2-2ba50c64644f",
                    "name": "Zwiebel",
                    "done": false
                },
                {
                    "id": "be07d3c1-8526-443d-97c1-f4ff2bf3d1dd",
                    "name": "Tomate",
                    "done": true
                }
            ]
        },
        {
            "id": "273e8601-beea-414b-a771-7495a8a416d4",
            "name": "Cage's list",
            "ingredients": [
                {
                    "id": "c89f1005-3960-4107-bfda-97228231cdda",
                    "name": "Mehl",
                    "done": false
                },
                {
                    "id": "f7886fad-b3e1-4748-a942-6209c60295de",
                    "name": "Zucker",
                    "done": false
                },
                {
                    "id": "2b752bfe-14b2-45c8-b6da-a08d1427ba42",
                    "name": "Backpulver",
                    "done": true
                }
            ]
        }
    ];
    return res.status(200).json(json);
});
router.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, groupId, userId, user, group, e_1, list, e_2, json;
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
                    e_1 = _a.sent();
                    console.log(e_1);
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
                    e_2 = _a.sent();
                    console.log(e_2);
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
