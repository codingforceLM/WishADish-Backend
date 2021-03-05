import express from "express";
const router = express.Router();

import {createConnection, Connection} from "typeorm";

router.get("/", function(req, res) {
    res.sendFile("C:\\Users\\Matthews\\Pictures\\Nicolas_Cage_-_66ème_Festival_de_Venise_(Mostra).jpg", () =>{});
});

module.exports = router;