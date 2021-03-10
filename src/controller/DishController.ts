import express from "express";
import {getConnection} from "typeorm";
import {Dish} from "../model/food/dish/Dish";
import {Ingredient} from "../model/food/ingredients/Ingredient";
const router = express.Router();

router.get("/", async function(req, res) {
    const userId = req.header("userId");
    if (userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});

    }
    let dishes = undefined;
    try {
        dishes = await getConnection().getRepository(Dish).find({
            relations: ["_user"],
            where: { _user: userId }
        }) as Dish[];
    } catch (e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }
    if(dishes == undefined) {
        return res.status(400).json({"error": "Error at db access"});
    }



    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json=[];
    for(let i=0; i<dishes.length; i++) {
        json.push({
            "id": dishes[i].id,
            "name": dishes[i].title
        });
    }

    return res.status(200).json(json);
});

router.get("/:id", function(req, res) {
    const dishId = req.params.id;
    if (dishId == undefined || dishId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    let json = {
        "argumetns": dishId,
        "id": "0d5ee71b-da78-4f28-a5f3-396db3e453eb",
        "name": "Schnitzel",
        "ingredients": [
            {
                "id": "82c19302-dca8-405d-96a4-0a56c833b0ec",
                "name": "Schweinefleisch",
                "amount": "170",
                "unit": "gramm"
            },
            {
                "id": "699e0a1b-ea26-44fb-a1cc-f25bc503e55f",
                "name": "Paniermehl",
                "amount": "10",
                "unit": "gramm"
            }
        ]
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})

    return res.status(200).json(json);
});


router.post("/", function(req, res) {
    const name = req.header("name");
    const ingridients = req.header("ingridients");
    if (name == undefined || name == "" || ingridients == undefined || ingridients == ""){
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Dish created",
        "arguments": {
            "name": name,
            "ingridients": ingridients
        }
    }

    return res.status(200).json(json);
});

router.put("/", function(req, res) {
    const dishId = req.header("dishId");
    const name = req.header("name");
    const ingridients = req.header("ingridients");
    if (dishId == undefined || dishId == ""){
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Wish updated",
        "arguments": {
            "dishId": dishId,
            "name": name,
            "ingridients": ingridients
        }
    }

    return res.status(200).json(json);
});

router.delete("/", function(req, res) {
    const dishId = req.header("dishId");
    if (dishId == undefined || dishId == ""){
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Wish deleted",
        "arguments": {
            "dishId": dishId
        }
    }

    return res.status(200).json(json);
});

module.exports = router;