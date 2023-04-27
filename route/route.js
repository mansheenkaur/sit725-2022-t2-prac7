const express = require("express");
let router = express.Router();
let controller = require('../controller/controller')

router.get("/api/cats", (req, res) => {
    controller.getAllCats(req,res);
});

router.post("/api/cats", (req, res) => {
    controller.createCat(req,res);
});

module.exports = router;