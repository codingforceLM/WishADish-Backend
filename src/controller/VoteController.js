"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post("/", function (req, res) {
    var wishId = req.header("wishId");
    var vote = req.header("vote");
    if (wishId == undefined || wishId == "" || vote == undefined || vote == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    var json = {
        "msg": "Vote cased",
        "arguments": {
            "wishId": wishId,
            "vote": vote
        }
    };
    return res.status(200).json(json);
});
module.exports = router;
