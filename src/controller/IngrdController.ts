import express from "express";
const router = express.Router();

router.get("/", function(req, res) {
    const username = req.header("name");
    if (username == undefined || username == ""){
        return res.status(404).json({"error": "ID unknown"})
    }
    //database res.status(400).json({"error": "ID couldnt be processed"})
    let json={
        "arguments": {
            "name": username
        }
    }

    return res.status(200).json(json);
});


module.exports = router;