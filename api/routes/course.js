const express = require("express");
const Course = require("../models/Course");

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const results = await Course.find({});
        res.send(results);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
