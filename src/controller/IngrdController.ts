import express from "express";

import {getConnection} from "typeorm/index";
import {Ingredient} from "../model/food/ingredients/Ingredient";
import {DishIngredient} from "../model/food/dish/DishIngredient";
import {ShoppingListIngredient} from "../model/shoppinglist/ShoppingListIngredient";
import {User} from "../model/user/User";
const middleware = require("../middleware/loginsystem");

const router = express.Router();
const {v4: uuidv4} = require('uuid');
router.get("/", middleware.isLoggedIn, async function (req, res) {
    const userId = req.header("userId");
    if (userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }

    let user = undefined;
    try {
        // @ts-ignore
        user = await getConnection().getRepository(Ingredient).find(
            { where: { _user: userId }, order: {_title: "ASC"} }
        ) as Ingredient[];
    } catch (e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }
    if(user == undefined ||user == []) {
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

router.post("/", middleware.isLoggedIn, async function (req, res) {
    const name = req.header("name");
    const userId = req.header("userId");
    if (name == undefined || name == "" || userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    let user;
    try{
        user = await getConnection().getRepository(User).findOne(
            {
                where:
                    {_id: userId}
            }) as User;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }

    if(user == undefined) {
        return res.status(400).json({"error": "Error at db access"});
    }
    let ingrd = new Ingredient(uuidv4(),name,user,undefined as unknown as DishIngredient[],undefined as unknown as ShoppingListIngredient[])
    try{
        await getConnection().getRepository(Ingredient).manager.save(ingrd)
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }
    let json = {
        "msg": "Ingredient created"
    };
    return res.status(200).json(json);
});

router.put("/", middleware.isLoggedIn, function (req, res) {
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

router.delete("/", middleware.isLoggedIn, function (req, res) {
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
