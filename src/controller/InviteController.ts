import express from "express";

import {User} from "../model/user/User";
import {Dish} from "../model/food/dish/Dish";
import {Ingredient} from "../model/food/ingredients/Ingredient";
import {UserGroup} from "../model/user/UserGroup";
import {Vote} from "../model/user/vote/Vote";
import {ShoppingList} from "../model/shoppinglist/ShoppingList";
import {getConnection} from "typeorm/index";
import {Group} from "../model/user/group/Group";
import {Invitation} from "../model/user/group/Invitation";

const middleware = require("../middleware/loginsystem");
const {v4: uuidv4} = require('uuid');
const router = express.Router();

router.get("/", middleware.isLoggedIn, async function(req, res) {
    const groupId = req.header("groupId");

    let result;
    try{
        result = await getConnection().getRepository(Group).findOne(
            {
                where:
                    {_id: groupId}
            }) as Group;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown groupId"});
    }

    let inv = new Invitation(
        uuidv4(),
        undefined as unknown as string,
        "",
        result
    );

    try{
        await getConnection().getRepository(Invitation).manager.save(inv);
    } catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }

    return res.status(200).json({
        "id": inv.id
    });

});

module.exports = router;
