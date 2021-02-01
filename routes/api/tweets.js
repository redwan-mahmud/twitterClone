const express = require("express");
const router = express.Router();

router.get("/text", (req,res) => {
    res.json({msg: "This is the tweet route"});
});


module.exports = router;