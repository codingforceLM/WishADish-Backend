import express from "express";
import { getConnection } from "typeorm";
import { Ingredient } from "../model/food/ingredients/Ingredient";
import { User } from "../model/user/User";

const router = express.Router();

router.get("/", async function (req, res) {
    const userId = req.header("userId");
    if (userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }

    let user = undefined;
    try {
        user = await getConnection().getRepository(Ingredient).find(
            { where: { _user: userId } }
        ) as Ingredient[];
    } catch (e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }
    if(user == undefined) {
        return res.status(400).json({"error": "Error at db access"});
    }

    let json = [];
    for(let i=0; i<user.length; i++) {
        json.push({
           "id": user[i].id,
            "name": user[i].title
        });
    }

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