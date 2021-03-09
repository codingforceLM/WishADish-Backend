"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    var username = req.header("name");
    if (username == undefined || username == "") {
        return res.status(404).json({ "error": "ID unknown" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "arguments": {
            "name": username
        }
    };
    return res.status(200).json(json);
});
module.exports = router;
