import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
    const userId = req.header("userId");
    if (userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = [{
        "arguments": {
            "userId": userId
        }
    },
        {
            "id": "80c3c252-b290-4736-b3a9-cc633459f6c9",
            "name": "Curry"
        },
        {
            "id": "b9746a95-70d8-46c4-b72a-0dc2191a69d9",
            "name": "Knoblauch"
        },
        {
            "id": "1c27f32f-f2b5-47ce-9b96-eb0442d12b27",
            "name": "Salz"
        }
    ]

    return res.status(200).json(json);
});

router.post("/", function (req, res) {
    const name = req.header("name");
    if (name == undefined || name == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Ingredient created",
        "arguments": {
            "name": name
        }
    }

    return res.status(200).json(json);
});

router.put("/", function (req, res) {
    const id = req.header("id");
    const name = req.header("name");
    if (id == undefined || id == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Ingredient updated",
        "arguments": {
            "id": id,
            "name": name
        }
    }

    return res.status(200).json(json);
});

router.delete("/", function (req, res) {
    const id = req.header("id");
    if (id == undefined || id == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Ingredient deleted",
        "arguments": {
            "id": id
        }
    }

    return res.status(200).json(json);
});

module.exports = router;