import express from "express";
import {Vote} from "../model/user/vote/Vote";
import {getConnection} from "typeorm/index";
import {User} from "../model/user/User";
import {Wish} from "../model/food/dish/Wish";
const {v4: uuidv4} = require('uuid');
const router = express.Router();

router.post("/", async function (req, res) {
    const wishId = req.header("wishId");
    const userId = req.header("userId");
    const vote = Number(req.header("vote"));
    if (wishId == undefined || wishId == "" || userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    if(vote != 0 && vote != 1){
        return res.status(404).json({"error": "vote unknown"});
    }

    let user;
    let wish;
    try{
        user = await getConnection().getRepository(User).findOne(
            {
                where:
                    {_id: userId}
            }) as User;
        wish = await getConnection().getRepository(Wish).findOne(
            {
                where:
                    {_id: wishId}
            }) as Wish;
    }catch(e) {
        console.log(e);
        return res.status(400).json({"error": "Unknown userId"});
    }

    if(user == undefined || wish == undefined) {
        return res.status(400).json({"error": "Error at db access"});
    }
    let voteObj = new Vote(
        uuidv4(),
        vote,
        user,
        wish
    );

    try{
        await getConnection().getRepository(Vote).manager.save(voteObj)
    }catch (e){
        console.log(e)
        return res.status(400).json({"error": "Error at db access"});
    }
    let json = {
        "msg": "Vote cased"
    };

    return res.status(200).json(json);

});


module.exports = router;