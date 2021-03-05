"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.sendFile("C:\\Users\\Matthews\\Pictures\\Nicolas_Cage_-_66ème_Festival_de_Venise_(Mostra).jpg", function () { });
});
module.exports = router;
