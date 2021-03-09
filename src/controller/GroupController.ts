import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
    const userId = req.header("userId");
    if (userId == undefined || userId == "") {
        return res.status(400).json({"error": "required field undefined"});
    }
    let json = {
        "example": [
            {
                "id": "7ffaa46e-9645-4371-8bdf-5f87b787b09f"
            },
            {
                "id": "f8575264-8b0d-4604-b8a7-9b7329d24bec"
            },
            {
                "id": "18e3627c-af38-41c6-976f-f6f3b63decca"
            }
        ],
        "arguments": {
            "userId": userId
        }
    }
    return res.status(200).json(json);
});

router.get("/:id", function (req, res) {
    const groupId = req.params.id;
    let json;
        if (groupId == undefined || groupId == "") {
            return res.status(400).json({"error": "required field undefined"});
        }
        json = {
            "example": [
                {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "name": "GroupA",
                    "user": [
                        {
                            "id": "123s4555-f89k-12d3-a456-426661337000",
                            "name": "Nicolas Cage",
                            "role": "admin"
                        },
                        {
                            "id": "321t6666-f888-asdf-re67-628322174550",
                            "name": "Kevin Spacey",
                            "role": "member"
                        }
                    ]
                }
            ],
            "arguments": {
                "groupId": groupId
            }
        }

    return res.status(200).json(json);
});

router.post("/", function (req, res) {
    const name = req.header("name");
    if (name == undefined || name == "") {
        return res.status(404).json({"error": "ID unknown"})///aaaaahhhhhhhh no doc?
    }

    let json = {
        "msg": "Group created",
        "arguments": {
            "name": name
        }
    }

    return res.status(200).json(json);
});

router.delete("/", function (req, res) {
    const id = req.header("id");
    if (id == undefined || id == "") {
        return res.status(404).json({"error": "ID unknown"})
    }
    //database res.status(400).json({"error": "Id couldnt be processed"})
    let json = {
        "msg": "Group deleted",
        "arguments": {
            "name": id
        }
    }

    return res.status(200).json(json);
});

router.put("/:id", function (req, res) {
    const id = req.params.id;
    const user = req.header("user");
    if (id == undefined || id == "") {
        return res.status(404).json({"error": "ID unknown"})
    }
    if (user == undefined || user == "") {
        return res.status(400).json({"error": "required field undefined"});
    }

    let json = {
        "msg": "Group updated",
        "arguments": {
            "name": id,
            "user": user
        }
    }

    return res.status(200).json(json);
});


module.exports = router;