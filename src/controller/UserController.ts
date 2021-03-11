import express from "express";
import {User} from "../model/user/User";
import {Dish} from "../model/food/dish/Dish";
import {Ingredient} from "../model/food/ingredients/Ingredient";
import {UserGroup} from "../model/user/UserGroup";
import {Vote} from "../model/user/vote/Vote";
import {ShoppingList} from "../model/shoppinglist/ShoppingList";
import {getConnection} from "typeorm/index";
const {v4: uuidv4} = require('uuid');
const router = express.Router();


router.get("/:name", function(req, res) {
    const username = req.params.name;
    if (username == undefined || username == ""){
        return res.status(404).json({"error": "ID unknown"})
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json={
        "firstname": "Nicolas",
        "lastname": "Cage",
        "birthdate": "07-01-1964",
        "email": "nic.cage@best-in-the-world.com",
        "arguments": {
            "name": username
        }
    }

    return res.status(200).json(json);
});


router.post("/", async function(req, res) {
    const firstname = req.header("firstname");
    const lastname = req.header("lastname");
    const username = req.header("username");
    const email = req.header("email");
    const password = req.header("password");
    const birthday = req.header("birthday");
    let fileurl = req.header("fileurl");
    if(firstname == undefined || lastname == undefined || username == undefined || email == undefined || password == undefined || birthday == undefined){
        return res.status(400).json({"error": "required field undefined"});
    }
    if(fileurl == undefined){
        fileurl = ""
    }
    let user = new User(uuidv4(),firstname,lastname,email,birthday,username,fileurl,
        undefined as unknown as Dish[],
        undefined as unknown as Ingredient[],
        undefined as unknown as UserGroup[],
        undefined as unknown as Vote[],
        undefined as unknown as ShoppingList[]
    )
    try{
        await getConnection().getRepository(UserGroup).manager.save(user)
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }
    let json = {
        "msg": "User created"
    };

    return res.status(200).json(json);


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