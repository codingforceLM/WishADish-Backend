import express from "express";
import {User} from "../model/user/User";
import {getConnection} from "typeorm";
import {Group} from "../model/user/group/Group";
import {UserGroup} from "../model/user/UserGroup";
import {Dish} from "../model/food/dish/Dish";

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


router.get("/:id", async function (req, res) {
    const groupId = req.params.id;
    if (groupId == undefined || groupId == "") {
        return res.status(400).json({"error": "required field undefined"});
    }

    let results
    try{
        results = await getConnection().getRepository(UserGroup).find(
            {
                relations: ['_group', '_user'],
                where:
                    {_group: groupId}
            }) as UserGroup[];
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }

    let json = []
    let userlist = []

    for(let i=0; i<results.length;i++){
        userlist.push({
            "id": results[i].user.id,
            "name": results[i].user.firstname + " " + results[i].user.lastname,
            "role": results[i].role
        })
    }

    json.push({
        "id": results[0].group.id,
        "name": results[0].group.title,
        "user": userlist
    })

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