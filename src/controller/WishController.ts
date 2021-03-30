import express from "express";
import {Like} from "typeorm";
import {In} from 'typeorm';
import {getConnection} from "typeorm";
import {User} from "../model/user/User";
import {Wish} from "../model/food/dish/Wish";
import {Group} from "../model/user/group/Group";
import {Dish} from "../model/food/dish/Dish";
import {Vote} from "../model/user/vote/Vote";
import {UserGroup} from "../model/user/UserGroup";
const middleware = require("../middleware/loginsystem");


const {v4: uuidv4} = require('uuid');
const router = express.Router();

router.get("/", middleware.isLoggedIn, async function (req, res) {
    const userId = req.header("userId");
    const day = req.header("day");
    const month = req.header("month");
    const year = req.header("year")
    if (userId == undefined || userId == "" || year == undefined || year == "") {
        return res.status(404).json({"error": "required field undefined"})
    }
    let results_wish;
    let results_vote;
    let results_ug;
    let json = [];

    try {
        results_ug = await getConnection().getRepository(UserGroup).find(
            {
                relations: ['_group'],
                where:
                    {_user: userId}
            }) as UserGroup[];
    } catch (e) {
        return res.status(400).json({"error": "Unknown userId"});
    }

    let groupIds = [];
    for(let i=0;i<results_ug.length;i++) {
        groupIds.push(results_ug[i].group.id);
    }

    if (day != undefined && day != "") {
        if (month == undefined || month == "") {
            return res.status(404).json({"error": "month undefined"})
        }
        try {
            results_wish = await getConnection().getRepository(Wish).find(
                {
                    relations: ['_user', '_dish','_group'],
                    where:
                        // month march or 3 needs to be 03
                        {_group: In(groupIds), _date: Like(year + "-" + month + "-"+day)}
                }) as Wish[];
        } catch (e) {
            return res.status(400).json({"error": "Unknown userId"});
        }
        if (results_wish == undefined || results_wish == []) {
            console.log("e");
            return res.status(400).json({"error": "Error at db access"});
        }

        for (let i = 0; i < results_wish.length; i++) {
            try {
                results_vote = await getConnection().getRepository(Vote).find(
                    {
                        relations: ['_wish'],
                        where:
                            {_wish: results_wish[0].id}
                    }) as Vote[];
            } catch (e) {
                return res.status(400).json({"error": "Unknown userId"});
            }
            if (results_vote == undefined || results_vote == []) {
                return res.status(400).json({"error": "Error at db access1"});
            }

            let vote_positiv = 0;
            let vote_negativ = 0;
            for (let i = 0; i < results_vote.length; i++) {
                if (results_vote[i].vote == 0) {
                    vote_negativ++;
                } else {
                    vote_positiv++;
                }
            }

            json.push({
                "id": results_wish[i].id,
                "name": results_wish[i].dish.title,
                "groupname": results_wish[i].group.title,
                "day": results_wish[i].date,
                "daytime": results_wish[i].daytime,
                "votes": {"positive": vote_positiv, "negative": vote_negativ}
            })
        }

    } else if (month != undefined && month != "") {
        try {
            results_wish = await getConnection().getRepository(Wish).find(
                {
                    relations: ['_user', '_dish','_group'],
                    where:
                        {_group: In(groupIds), _date: Like(year + "-" + month + "-%")}
                }) as Wish[];
        } catch (e) {
            return res.status(400).json({"error": "Unknown userId"});
        }
        if (results_wish == undefined || results_wish == []) {
            console.log("e");
            return res.status(400).json({"error": "Error at db access"});
        }

        for (let i = 0; i < results_wish.length; i++) {
            try {
                results_vote = await getConnection().getRepository(Vote).find(
                    {
                        relations: ['_wish'],
                        where:
                            {_wish: results_wish[i].id}
                    }) as Vote[];
            } catch (e) {
                return res.status(400).json({"error": "Unknown userId"});
            }
            if (results_vote == undefined || results_vote == []) {
                return res.status(400).json({"error": "Error at db access1"});
            }

            let vote_positiv = 0;
            let vote_negativ = 0;
            for (let i = 0; i < results_vote.length; i++) {
                if (results_vote[i].vote == 0) {
                    vote_negativ++;
                } else {
                    vote_positiv++;
                }
            }
            json.push({
                "id": results_wish[i].id,
                "name": results_wish[i].dish.title,
                "groupname": results_wish[i].group.title,
                "day": results_wish[i].date,
                "daytime": results_wish[i].daytime,
                "votes": {"positive": vote_positiv, "negative": vote_negativ}
            })
        }
    } else {
        return res.status(404).json({"error": "Missing day/month argument"});
    }

    return res.status(200).json(json);
});

router.post("/", middleware.isLoggedIn, async function (req, res) {
    const userId = req.header("userId");
    const groupId = req.header("groupId");
    const dishId = req.header("dishId");
    const daytime = req.header("daytime");
    const date = req.header("wishDate");
    
    if (groupId == undefined || groupId == "" || dishId == undefined || dishId == "" || daytime == undefined || daytime == "" || date == undefined || date == "") {
        return res.status(404).json({"error": "required field undefined"})
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
    if(user == undefined) {
        return res.status(400).json({"error": "Error at db access"});
    }

    let group;
    try{
        group = await getConnection().getRepository(Group).findOne(
            {
                where:
                    {_id: groupId}
            }) as Group;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown groupId"});
    }
    if(group == null) {
        return res.status(400).json({"error": "Unknown groupId"});
    }
    if(group == undefined) {
        return res.status(400).json({"error": "Error at db access"});
    }

    let dish;
    try{
        dish = await getConnection().getRepository(Dish).findOne(
            {
                where:
                    {_id: dishId}
            }) as Dish;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown dishId"});
    }
    if(dish == null) {
        return res.status(400).json({"error": "Unknown dishId"});
    }
    if(dish == undefined) {
        return res.status(400).json({"error": "Error at db access"});
    }

    let datef = date.match("[0-9]{4}-[0-9]{2}-[0-9]{2}");
    if(datef == null || datef.length != 1) {
        return res.status(400).json({"error": "wrong date format"});
    }

    let wish = new Wish(
        uuidv4(),
        daytime,
        date,
        user,
        dish,
        group,
        undefined as unknown as Vote[]
    );

    let json = {
        "msg": "Wish created",
    }

    try{
        await getConnection().getRepository(Wish).manager.save(wish);
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at persistence"});
    }

    return res.status(200).json(json);
});

router.put("/", middleware.isLoggedIn, function (req, res) {
    const wishId = req.header("wishId");
    const groupId = req.header("groupId");
    const dishId = req.header("dishId");
    const daytime = req.header("daytime");
    if (wishId == undefined || wishId == "") {
        return res.status(404).json({"error": "required field undefined"})
    }

    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Wish updated",
        "arguments": {
            "wishId": wishId,
            "groupId": groupId,
            "dishId": dishId,
            "daytime": daytime
        }
    }

    return res.status(200).json(json);
});

router.delete("/", middleware.isLoggedIn, function (req, res) {
    const wishId = req.header("wishId");
    if (wishId == undefined || wishId == "") {
        return res.status(404).json({"error": "required field undefined"})
    }

    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Wish deleted",
        "arguments": {
            "wishId": wishId
        }
    }

    return res.status(200).json(json);
});
module.exports = router;
