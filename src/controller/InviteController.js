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
var User_1 = require("../model/user/User");
var UserGroup_1 = require("../model/user/UserGroup");
var index_1 = require("typeorm/index");
var Group_1 = require("../model/user/group/Group");
var Invitation_1 = require("../model/user/group/Invitation");
var middleware = require("../middleware/loginsystem");
var uuidv4 = require('uuid').v4;
var router = express_1.default.Router();
router.get("/", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var groupId, result, e_1, inv, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groupId = req.header("groupId");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(Group_1.Group).findOne({
                            where: { _id: groupId }
                        })];
                case 2:
                    result = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown groupId" })];
                case 4:
                    inv = new Invitation_1.Invitation(uuidv4(), undefined, "", result);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(Invitation_1.Invitation).manager.save(inv)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                case 8: return [2 /*return*/, res.status(200).json({
                        "id": inv.id
                    })];
            }
        });
    });
});
router.post("/", middleware.isLoggedIn, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var inviteId, userId, result, e_3, group, e_4, e_5, user, date, dd, mm, yyyy, ug, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inviteId = req.header("inviteId");
                    userId = req.header("userId");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(Invitation_1.Invitation).findOne({
                            relations: ['_group'],
                            where: { _id: inviteId }
                        })];
                case 2:
                    result = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown inviteId" })];
                case 4:
                    group = result.group;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(UserGroup_1.UserGroup).find({
                            where: {
                                _group: group.id,
                                _user: userId
                            }
                        })];
                case 6:
                    result = (_a.sent());
                    return [3 /*break*/, 8];
                case 7:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [2 /*return*/, res.status(400).json({ "error": "I dont know really" })];
                case 8:
                    if (result.length !== 0) {
                        return [2 /*return*/, res.status(400).json({ "error": "User already member of group" })];
                        console.log(result);
                    }
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(User_1.User).findOne({
                            where: { _id: userId }
                        })];
                case 10:
                    result = (_a.sent());
                    return [3 /*break*/, 12];
                case 11:
                    e_5 = _a.sent();
                    console.log(e_5);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown userId" })];
                case 12:
                    user = result;
                    date = new Date();
                    dd = String(date.getDate()).padStart(2, '0');
                    mm = String(date.getMonth() + 1).padStart(2, '0');
                    yyyy = date.getFullYear();
                    ug = new UserGroup_1.UserGroup(uuidv4(), yyyy + "-" + mm + "-" + dd, "member", user, group);
                    _a.label = 13;
                case 13:
                    _a.trys.push([13, 15, , 16]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(UserGroup_1.UserGroup).manager.save(ug)];
                case 14:
                    _a.sent();
                    return [3 /*break*/, 16];
                case 15:
                    e_6 = _a.sent();
                    console.log(e_6);
                    return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                case 16: return [2 /*return*/, res.status(200).json({
                        "msg": "user joined group"
                    })];
            }
        });
    });
});
module.exports = router;
