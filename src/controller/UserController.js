"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/:name", function (req, res) {
    var username = req.params.name;
    if (username == undefined || username == "") {
        return res.status(404).json({ "error": "ID unknown" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "firstname": "Nicolas",
        "lastname": "Cage",
        "birthdate": "07-01-1964",
        "email": "nic.cage@best-in-the-world.com",
        "arguments": {
            "name": username
        }
    };
    return res.status(200).json(json);
});
router.post("/", function (req, res) {
    var firstname = req.header("firstname");
    var lastname = req.header("lastname");
    var username = req.header("username");
    var email = req.header("email");
    var password = req.header("password");
    var birthdate = req.header("birthdate");
    if (firstname == undefined || lastname == undefined || username == undefined || email == undefined || password == undefined || birthdate == undefined) {
        return res.status(400).json({ "error": "required field undefined" });
    }
    var json = {
        "msg": "User created",
        "arguments": {
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "email": email,
            "password": password,
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
