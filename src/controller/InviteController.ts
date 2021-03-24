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

router.post("/", middleware.isLoggedIn, async function(req, res) {
    const inviteId = req.header("inviteId");
    const userId = req.header("userId");

    let result;
    try{
        result = await getConnection().getRepository(Invitation).findOne(
            {
                relations: ['_group'],
                where:
                    {_id: inviteId}
            }) as Invitation;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown inviteId"});
    }
    if(result == undefined) {
        return res.status(400).json({"error": "invite undefined"});

    }

    let group = result.group;
    try{
        result = await getConnection().getRepository(UserGroup).find(
            {
                where:
                    {
                        _group: group.id,
                        _user: userId
                    }
            }) as UserGroup[];
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "I dont know really"});
    }
    if(result.length !== 0) {
        console.log(result);
        return res.status(400).json({"error": "User already member of group"});
    }

    try{
        result = await getConnection().getRepository(User).findOne(
            {
                where:
                    {_id: userId}
            }) as User;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }

    let user = result;
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();

    let ug = new UserGroup(
        uuidv4(),
        yyyy+"-"+mm+"-"+dd,
        "member",
        user,
        group
    );

    try{
        await getConnection().getRepository(UserGroup).manager.save(ug);
    } catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }

    return res.status(200).json({
        "msg": "user joined group"
    });

});

module.exports = router;
