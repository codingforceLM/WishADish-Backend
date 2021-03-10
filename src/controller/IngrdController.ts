import express from "express";
import {getConnection} from "typeorm/index";
import {Ingredient} from "../model/food/ingredients/Ingredient";
import {DishIngredient} from "../model/food/dish/DishIngredient";
import {ShoppingListIngredient} from "../model/shoppinglist/ShoppingListIngredient";
import {User} from "../model/user/User";

const router = express.Router();
const {v4: uuidv4} = require('uuid');
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

router.post("/", async function (req, res) {
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