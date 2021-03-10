import express from "express";

const router = express.Router();

router.post("/", function (req, res) {
    const wishId = req.header("wishId");
    const vote = req.header("vote");
    if (wishId == undefined || wishId == "" || vote == undefined || vote == "") {
        return res.status(404).json({"error": "required field undefined"});
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json = {
        "msg": "Vote cased",
        "arguments": {
            "wishId": wishId,
            "vote": vote
        }
    }

    return res.status(200).json(json);
});


module.exports = router;