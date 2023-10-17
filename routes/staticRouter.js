const express = require("express");

const staticRouter = express.Router();

staticRouter.get("/", (req,res)=>{
    //res.render("")
    console.log("hello from static route");
    res.render("home");
})

module.exports={
    staticRouter,
}