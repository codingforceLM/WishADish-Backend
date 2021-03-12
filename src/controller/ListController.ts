import express from "express";
import {ShoppingList} from "../model/shoppinglist/ShoppingList";
import {ShoppingListIngredient} from "../model/shoppinglist/ShoppingListIngredient";
import {getConnection} from "typeorm/index";
import {User} from "../model/user/User";
import {Group} from "../model/user/group/Group";
const {v4: uuidv4} = require('uuid');

const router = express.Router();

router.get("/", async function (req, res) {
    const groupId = req.header("groupId");
    const done = req.header("done");
    if (groupId == undefined || groupId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }

    let lists;
    let json = [];
    try{
        if(done == "true"){
            lists = await getConnection().getRepository(ShoppingList).find(
                {
                    where:
                        {_group: groupId,_done : Number(0)}
                }) as ShoppingList[];
        }else {
            lists = await getConnection().getRepository(ShoppingList).find(
                {
                    where:
                        {_group: groupId}
                }) as ShoppingList[];
        }

    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown groupId"});
    }

    if(lists == undefined || lists == [] || lists.length == 0) {
        return res.status(400).json({"error": "Error at db access"});
    }
    for(let i=0; i<lists.length;i++){
        let result;
        try{
            result = await getConnection().getRepository(ShoppingListIngredient).find(
                {
                    relations: ['_ingredient'],
                    where:
                        {_list: lists[i]}
                }) as ShoppingListIngredient[];
        }catch(e) {
            console.log(e);
            return res.status(400).json({"error": "Unknown groupId"});
        }

        if(result == undefined || result == []) {
            return res.status(400).json({"error": "Error at db access"});
        }

        let ingrd = []
        for(let i=0; i<result.length;i++){
            ingrd.push({
                'id': result[i].ingredient.id,
                'name': result[i].ingredient.title,
                'done': "missing"
            })
        }

        json.push({
            'id': lists[i].id,
            'name': lists[i].title,
            'ingredients': ingrd
        })
    }

    return res.status(200).json(json);
});


router.post("/", async function (req, res) {
    const name = req.header("name");
    const groupId = req.header("groupId");
    const userId = req.header("userId");
    if (name == undefined || name == "" || groupId == undefined || groupId == ""|| userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }

    let user;
    let group;
    try{
        user = await getConnection().getRepository(User).findOne(
            {
                where:
                    {_id: userId}
            }) as User;
        group = await getConnection().getRepository(Group).findOne(
            {
                where:
                    {_id: groupId}
            }) as Group;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }

    if(user == undefined || group == undefined ) {
        return res.status(400).json({"error": "Error at db access"});
    }
    let list = new ShoppingList(uuidv4(),name,false,user,undefined as unknown as ShoppingListIngredient[],group)
    try{
        await getConnection().getRepository(ShoppingList).manager.save(list)
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }
    let json = {
        "msg": "List created"
    };
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