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
var uuidv4 = require('uuid').v4;
var router = express_1.default.Router();
router.get("/:name", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var nick, user, e_1, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nick = req.params.name;
                    if (nick == undefined || nick == "") {
                        return [2 /*return*/, res.status(404).json({ "error": "cannot get user for undefined" })];
                    }
                    user = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(User_1.User).findOne({ where: { _username: nick } })];
                case 2:
                    user = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, res.status(400).json({ "error": "Unknown username" })];
                case 4:
                    if (user == undefined) {
                        return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                    }
                    json = {
                        "userId": user.id,
                        "firstname": user.firstname,
                        "lastname": user.lastname,
                        "birthdate": user.birthday,
                        "email": user.email,
                        "fileurl": user.fileurl
                    };
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var firstname, lastname, username, email, password, birthday, fileurl, user, e_2, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    firstname = req.header("firstname");
                    lastname = req.header("lastname");
                    username = req.header("username");
                    email = req.header("email");
                    password = req.header("password");
                    birthday = req.header("birthday");
                    fileurl = req.header("fileurl");
                    if (firstname == undefined || lastname == undefined || username == undefined || email == undefined || password == undefined || birthday == undefined) {
                        return [2 /*return*/, res.status(400).json({ "error": "required field undefined" })];
                    }
                    if (fileurl == undefined) {
                        fileurl = "";
                    }
                    user = new User_1.User(uuidv4(), firstname, lastname, email, password, birthday, username, undefined, fileurl, undefined, undefined, undefined, undefined, undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.getConnection().getRepository(UserGroup_1.UserGroup).manager.save(user)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, res.status(400).json({ "error": "Error at db access" })];
                case 4:
                    json = {
                        "msg": "User created"
                    };
                    return [2 /*return*/, res.status(200).json(json)];
            }
        });
    });
});
router.put("/", function (req, res) {
    var id = req.header("id");
    var firstname = req.header("firstname");
    var lastname = req.header("lastname");
    var username = req.header("username");
    var email = req.header("email");
    var birthdate = req.header("birthdate");
    if (id == undefined || id == "") {
        return res.status(400).json({ "error": "required field undefined" });
    }
    var json = {
        "msg": "User updated",
        "arguments": {
            "id": id,
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "email": email,
            "birthdate": birthdate
        }
    };
    var success = true;
    if (success) {
        return res.status(200).json(json);
    }
    else {
        return res.status(400).json({ "error": "ID couldnt be processed" });
    }
});
module.exports = router;
