import express from "express";
import {getConnection} from "typeorm";
import {Dish} from "../model/food/dish/Dish";
import {Ingredient} from "../model/food/ingredients/Ingredient";
import {DishIngredient} from "../model/food/dish/DishIngredient";
import {UserGroup} from "../model/user/UserGroup";
import {User} from "../model/user/User";
import {Wish} from "../model/food/dish/Wish";
const {v4: uuidv4} = require('uuid');
const router = express.Router();
const middleware = require("../middleware/loginsystem");

router.get("/", middleware.isLoggedIn, async function(req, res) {
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
    if(dishes == undefined || dishes == []) {
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

router.get("/:id", middleware.isLoggedIn, async function(req, res) {
    const dishId = req.params.id;
    if (dishId == undefined || dishId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }

    let dishes = undefined;
    try {
        dishes = await getConnection().getRepository(DishIngredient).find({
            relations: ["_dish", "_ingredient"],
            where: { _dish: dishId }
        }) as DishIngredient[];
    } catch (e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }
    if(dishes == undefined || dishes == [] || dishes.length == 0) {
        return res.status(400).json({"error": "Error at db access"});
    }

    let dish = dishes[0].dish;

    let json = {
        "id": dish.id,
        "name": dish.title,
        "ingredients": Array<object>()
    };

    for(let i=0; i< dishes.length; i++) {
        let ingredient = dishes[i].ingredient
        json.ingredients.push({
            "id": ingredient.id,
            "name": ingredient.title,
            "amount": dishes[i].amount,
            "unit": dishes[i].unit
        });
    }

    return res.status(200).json(json);
});

router.post("/", middleware.isLoggedIn, async function(req, res) {
    const name = req.header("name");
    const ingridientsparam = req.header("ingredients");
    const userId = req.header("userId");
    if (name == undefined || name == "" || ingridientsparam == undefined || ingridientsparam == "" || userId == undefined || userId == ""){
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
    if(user == null) {
        return res.status(400).json({"error": "Unknown userId"});
    }

    let ingredients;
    try {
        ingredients = JSON.parse(ingridientsparam);
    } catch (e) {
        console.log(e);
        return res.status(400).json({"error": "couldnt parse ingredients json"});
    }

    for(let i=0;i<ingredients.length;i++) {
        let ingrd = ingredients[i];
        let idmiss = true;
        let ammiss = true;
        let unmiss = true;
        if(ingrd.hasOwnProperty("id")) {
            idmiss = false;
        }
        if(ingrd.hasOwnProperty("amount")) {
            ammiss = false;
        }
        if(ingrd.hasOwnProperty("unit")) {
            unmiss = false;
        }
        if(idmiss || ammiss || unmiss) {
            let missing = (!idmiss?"":"id, ") + (!ammiss?"":"amount, ") + (!unmiss?"":"unit");
            return res.status(400).json({"error": "object "+i+" is missing "+missing});
        }
    }

    let dish = new Dish(
        uuidv4(),
        name,
        user,
        undefined as unknown as DishIngredient[],
        undefined as unknown as Wish[]
    );

    let dis = [] as DishIngredient[];
    for(let i=0;i<ingredients.length;i++) {
        let ingrd = ingredients[i];

        let qIngrd;
        try{
            qIngrd = await getConnection().getRepository(Ingredient).findOne(
                {
                    where:
                        {_id: ingrd.id}
                }) as Ingredient;
        }catch(e) {
            console.log(e);
            return res.status(400).json({"error": "Unknown ingredientId "+ingrd.id});
        }
        if(qIngrd == null) {
            return res.status(400).json({"error": "Unknown ingredientId "+ingrd.id});
        }

        dis.push(new DishIngredient(
            uuidv4(),
            dish,
            qIngrd,
            ingrd.amount,
            ingrd.unit
        ));
    }

    dish.dishIngredients = dis;

    await getConnection().getRepository(Dish).manager.save(dish);

    let json = {
        "msg": "Dish created",
    }

    return res.status(200).json(json);
});

router.put("/", middleware.isLoggedIn, function(req, res) {
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

router.delete("/", middleware.isLoggedIn, function(req, res) {
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
