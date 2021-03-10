import express from "express";
import {getConnection} from "typeorm/index";
import {Wish} from "../model/food/dish/Wish";
import {Vote} from "../model/user/vote/Vote";

const router = express.Router();

router.get("/", async function (req, res) {
    const userId = req.header("userId");
    const day = req.header("day");
    const month = req.header("month");
    if (userId == undefined || userId == "") {
        return res.status(404).json({"error": "required field undefined"})
    }
    let results_wish;
    let results_vote;
    let json = [];
    if (day != undefined && day != "") {
        if (month == undefined || month == "") {
            return res.status(404).json({"error": "month undefined"})
        }

        try{
            results_wish = await getConnection().getRepository(Wish).find(
                {
                    relations: ['_user', '_dish'],
                    where:
                        {_user: userId}
                }) as Wish[];
        }catch(e) {
            return res.status(400).json({"error": "Unknown userId"});
        }
        if(results_wish == undefined || results_wish == []) {
            console.log("e");
            return res.status(400).json({"error": "Error at db access"});
        }

        for(let i=0; i<results_wish.length;i++){
            try{
                results_vote = await getConnection().getRepository(Vote).find(
                    {
                        relations: ['_wish'],
                        where:
                            {_wish: results_wish[0].id}
                    }) as Vote[];
            }catch(e) {
                return res.status(400).json({"error": "Unknown userId"});
            }
            if(results_vote == undefined || results_vote == []) {
                return res.status(400).json({"error": "Error at db access1"});
            }

            let vote_positiv = 0;
            let vote_negativ = 0;
            for(let i=0; i<results_vote.length; i++){
                if(results_vote[i].vote==0){
                    vote_negativ++;
                }else{
                    vote_positiv++;
                }
            }

            json.push({
                "id": results_wish[0].id,
                "name": results_wish[0].dish.title,
                "groupname": "MISSING BLLOOOOCK MISSING",
                "day": "MISSING BLLOOOOCK MISSING",
                "daytime": "MISSING BLLOOOOCK MISSING",
                "votes": {"positive": vote_positiv,"negative": vote_negativ}
            })
        }

    }

    return res.status(200).json(json);
});

router.post("/", function (req, res) {
    const groupId = req.header("groupId");
    const dishId = req.header("dishId");
    const daytime = req.header("daytime");
    if (groupId == undefined || groupId == "" || dishId == undefined || dishId == "" || daytime == undefined || daytime == "") {
        return res.status(404).json({"error": "required field undefined"})
    }

    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Wish created",
        "arguments": {
            "groupId": groupId,
            "dishId": dishId,
            "daytime": daytime
        }
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