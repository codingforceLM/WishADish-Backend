"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    var userId = req.header("userId");
    var day = req.header("day");
    var month = req.header("month");
    var json = undefined;
    if (userId == undefined || userId == "") {
        return res.status(404).json({ "error": "required field undefined" });
    }
    if (day != undefined && day != "") {
        if (month == undefined || month == "") {
            return res.status(404).json({ "error": "month undefined" });
        }
        json = [{
                "arguments": {
                    "userId": userId,
                    "day": day,
                    "month": month
                }
            },
            {
                "id": "a4b13f26-a617-4303-9a63-a74c1e44d233",
                "name": "Bolognese",
                "groupname": "Familie Cage",
                "day": "24-12-2020",
                "daytime": "lunch",
                "votes": {
                    "positive": 5,
                    "negative": 1
                }
            },
            {
                "id": "2ea16774-18dd-40b7-b724-bd2505b83ae0",
                "name": "Nudelauflauf",
                "groupname": "Familie Spacey",
                "day": "24-12-2020",
                "daytime": "evening",
                "votes": {
                    "positive": 4,
                    "negative": 0
                }
            }
        ];
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    if (json == undefined) {
        json = [{
                "arguments": {
                    "userId": userId,
                    "day": day,
                    "month": month
                }
            },
            {
                "id": "a4b13f26-a617-4303-9a63-a74c1e44d233",
                "name": "Bolognese",
                "groupname": "Familie Cage",
                "day": "24-12-2020",
                "daytime": "lunch",
                "votes": {
                    "positive": 5,
                    "negative": 1
                }
            },
            {
                "id": "2ea16774-18dd-40b7-b724-bd2505b83ae0",
                "name": "Nudelauflauf",
                "groupname": "Familie Spacey",
                "day": "24-12-2020",
                "daytime": "evening",
                "votes": {
                    "positive": 4,
                    "negative": 0
                }
            }
        ];
    }
    return res.status(200).json(json);
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
