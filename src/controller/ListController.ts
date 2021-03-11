import express from "express";
import {getConnection} from "typeorm/index";
import {ShoppingList} from "../model/shoppinglist/ShoppingList";
import {Group} from "../model/user/group/Group";

const router = express.Router();

router.get("/", async function (req, res) {
    const groupId = req.header("groupId");
    const done = req.header("done");
    if (groupId == undefined || groupId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    let results;
    try{
        results = await getConnection().getRepository(ShoppingList).find(
            {
                relations: ['_shoppingListIngredients'],
                where:
                    {_id: groupId}
            }) as ShoppingList[];
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown groupId"});
    }

    if(results == undefined || results == []) {
        return res.status(400).json({"error": "Error at db access"});
    }
/*
    let json = [];
    let userlist = [];

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
*/
    return res.status(200).json(results);
});


router.post("/", function (req, res) {
    const name = req.header("name");
    const groupId = req.header("groupId");
    if (name == undefined || name == "" || groupId == undefined || groupId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "List created",
        "arguments": {
            "name": name,
            "groupId": groupId
        }
    }

    return res.status(200).json(json);
});

router.put("/", function (req, res) {
    const id = req.header("id");
    const name = req.header("name");
    const ingredients = req.header("ingredients");
    if (id == undefined || id == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "List updated",
        "arguments": {
            "id": id,
            "name": name,
            "ingredients": ingredients
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
        "msg": "List deleted",
        "arguments": {
            "id": id
        }
    }

    return res.status(200).json(json);
});


module.exports = router;