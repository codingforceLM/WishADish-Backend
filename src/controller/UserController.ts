import express from "express";
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