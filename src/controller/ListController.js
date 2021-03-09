"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
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
