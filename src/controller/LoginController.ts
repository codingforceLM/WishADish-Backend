import express from "express";
import {getConnection} from "typeorm/index";
import {User} from "../model/user/User";

const bcrypt = require('bcryptjs');
const logsysconfig = require("../../config/logsysconfig.json");
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
const router = express.Router();

router.post('/', async function(req, res){
    const email = req.header("email");
    const password = req.header("password");

    let user = undefined as unknown as User;
    try {
        user = await getConnection().getRepository(User).findOne({
            where: {
                _email: email
            }
        }) as User;
    } catch (e) {
        console.log(e);
        return res.status(400).json({"error": "Username or password is incorrect!"});
    }
    if(user == undefined) {
        return res.status(400).json({"error": "Username or password is incorrect!"});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        return res.status(400).json({"error": "Username or password is incorrect!"});
    }

    const token = jwt.sign(
        {
            username: user.username,
            userId: user.id
        },
        logsysconfig.jwtsecret,
        {
            expiresIn: '7d'
        }
    );

    return res.status(200).json({
        "msg": "logged in",
        "token": token,
        "userId": user.id,
        "username": user.username
    });
});

module.exports = router;
