import express from "express";
import {getConnection} from "typeorm";
import {UserGroup} from "../model/user/UserGroup";
import {User} from "../model/user/User";
import {Group} from "../model/user/group/Group";
import {Invitation} from "../model/user/group/Invitation";


const router = express.Router();
const {v4: uuidv4} = require('uuid');
router.get("/", async function (req, res) {
    const userId = req.header("userId");
    if (userId == undefined || userId == "") {
        return res.status(400).json({"error": "required field undefined"});
    }

    let results;
    try{
        results = await getConnection().getRepository(UserGroup).find(
            {
                relations: ['_group', '_user'],
                where:
                    {_user: userId}
            }) as UserGroup[];
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }
    if(results == undefined || results == []) {
        return res.status(400).json({"error": "Error at db access"});
    }

    let json = [];

    for(let i=0; i<results.length;i++){
        json.push({
            "id": results[i].group.id
        })
    }

    return res.status(200).json(json);
});


router.get("/:id", async function (req, res) {
    const groupId = req.params.id;
    if (groupId == undefined || groupId == "") {
        return res.status(400).json({"error": "required field undefined"});
    }

    let results;
    try{
        results = await getConnection().getRepository(UserGroup).find(
            {
                relations: ['_group', '_user'],
                where:
                    {_group: groupId}
            }) as UserGroup[];
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }

    if(results == undefined || results == []) {
        return res.status(400).json({"error": "Error at db access"});
    }

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
    let date: Date = new Date();
    let group = new Group(
        uuidv4(),
        name,
        date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay(),
        undefined as unknown as UserGroup[],
        undefined as unknown as Invitation[]
    );
    let userGroup = new UserGroup(uuidv4(),date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay(),"admin",user,group)
    try{
        await getConnection().getRepository(Group).manager.save(group);
        await getConnection().getRepository(Group).manager.save(userGroup);
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }
    let json = {
        "msg": "Group created"
    };
    return res.status(200).json(json);
});

router.delete("/", function (req, res) {
    const id = req.header("id");
    if (id == undefined || id == "") {
        return res.status(404).json({"error": "ID unknown"})
    }
    //database res.status(400).json({"error": "Id couldnt be processed"})
    let json = {
        "msg": "Group deleted",
        "arguments": {
            "name": id
        }
    }

    return res.status(200).json(json);
});

router.put("/:id", function (req, res) {
    const id = req.params.id;
    const user = req.header("user");
    if (id == undefined || id == "") {
        return res.status(404).json({"error": "ID unknown"})
    }
    if (user == undefined || user == "") {
        return res.status(400).json({"error": "required field undefined"});
    }

    let json = {
        "msg": "Group updated",
        "arguments": {
            "name": id,
            "user": user
        }
    }

    return res.status(200).json(json);
});


module.exports = router;
