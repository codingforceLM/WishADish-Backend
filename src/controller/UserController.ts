import express from "express";
import { getConnection } from "typeorm";
import {User} from "../model/user/User";
const router = express.Router();

router.get("/:name",  async function(req, res) {
    const nick = req.params.name;
    if (nick == undefined || nick == ""){
        return res.status(404).json({"error": "cannot get user for undefined"})
    }

    let user = undefined;
    try {
        user = await getConnection().getRepository(User).findOne({ where: { _username: nick} }) as User;
    } catch (e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown username"});
    }
    if(user == undefined) {
        return res.status(400).json({"error": "Error at db access"});
    }

    let json={
        "firstname": user.firstname,
        "lastname": user.lastname,
        "birthdate": user.birthday,
        "email": user.email,
        "arguments": {
            "name": nick
        }
    }

    return res.status(200).json(json);
});


router.post("/", function(req, res) {
    const firstname = req.header("firstname");
    const lastname = req.header("lastname");
    const username = req.header("username");
    const email = req.header("email");
    const password = req.header("password");
    const birthdate = req.header("birthdate");
    if(firstname == undefined || lastname == undefined || username == undefined || email == undefined || password == undefined || birthdate == undefined){
        return res.status(400).json({"error": "required field undefined"});
    }
    let json={
        "msg": "User created",
        "arguments": {
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "email": email,
            "password": password,
            "birthdate": birthdate
        }
    }

    let success = true;
    if(success){
        return res.status(200).json(json);
    }else{
        return res.status(400).json({"error": "ID couldnt be processed"});
    }

});

router.put("/", function(req, res) {
    const id = req.header("id");
    const firstname = req.header("firstname");
    const lastname = req.header("lastname");
    const username = req.header("username");
    const email = req.header("email");
    const birthdate = req.header("birthdate");
    if(id == undefined || id == ""){
        return res.status(400).json({"error": "required field undefined"});
    }
    let json={
        "msg": "User updated",
        "arguments": {
            "id": id,
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "email": email,
            "birthdate": birthdate
        }
    }

    let success = true;
    if(success){
        return res.status(200).json(json);
    }else{
        return res.status(400).json({"error": "ID couldnt be processed"});
    }

});

module.exports = router;