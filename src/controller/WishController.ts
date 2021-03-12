import express from "express";
import {getConnection} from "typeorm";
import {User} from "../model/user/User";
import {Wish} from "../model/food/dish/Wish";
import {Group} from "../model/user/group/Group";
import {Dish} from "../model/food/dish/Dish";
import {Vote} from "../model/user/vote/Vote";

const {v4: uuidv4} = require('uuid');
const router = express.Router();

router.get("/", function (req, res) {
    const userId = req.header("userId");
    const day = req.header("day");
    const month = req.header("month");
    let json = undefined;
    if (userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"})
    }
    if (day != undefined && day != "") {
        if (month == undefined || month == "") {
            return res.status(404).json({"error": "month undefined"})
        }
        json = [{
            "arguments": {
                "userId": userId,
                "day": day,
                "month": month
            }
        },
            {
                "id": "a4b13f26-a617-4303-9a63-a74c1e44d233",
                "name": "Bolognese",
                "groupname": "Familie Cage",
                "day": "24-12-2020",
                "daytime": "lunch",
                "votes": {
                    "positive": 5,
                    "negative": 1
                }
            },
            {
                "id": "2ea16774-18dd-40b7-b724-bd2505b83ae0",
                "name": "Nudelauflauf",
                "groupname": "Familie Spacey",
                "day": "24-12-2020",
                "daytime": "evening",
                "votes": {
                    "positive": 4,
                    "negative": 0
                }
            }
        ]

    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    if (json == undefined) {
        json = [{
            "arguments": {
                "userId": userId,
                "day": day,
                "month": month
            }
        },
            {
                "id": "a4b13f26-a617-4303-9a63-a74c1e44d233",
                "name": "Bolognese",
                "groupname": "Familie Cage",
                "day": "24-12-2020",
                "daytime": "lunch",
                "votes": {
                    "positive": 5,
                    "negative": 1
                }
            },
            {
                "id": "2ea16774-18dd-40b7-b724-bd2505b83ae0",
                "name": "Nudelauflauf",
                "groupname": "Familie Spacey",
                "day": "24-12-2020",
                "daytime": "evening",
                "votes": {
                    "positive": 4,
                    "negative": 0
                }
            }
        ]
    }


    return res.status(200).json(json);
});

router.post("/", async function (req, res) {
    const userId = req.header("userId");
    const groupId = req.header("groupId");
    const dishId = req.header("dishId");
    const daytime = req.header("daytime");
    const date = req.header("date");
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

router.put("/", function (req, res) {
    const wishId  = req.header("wishId");
    const groupId  = req.header("groupId");
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

router.delete("/", function (req, res) {
    const wishId  = req.header("wishId");
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