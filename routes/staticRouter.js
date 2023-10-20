const express = require("express");
const { URL } = require("../models/url")

const staticRouter = express.Router();

 staticRouter.get("/url", async (req,res)=>{
    //res.render("")
    console.log("hello from static route");
    const UserID = req.user._id;
    console.log(UserID);
    const objects = [];
     await URL.find({ createdBy: UserID})
     .then((documents)=>{
        documents.forEach((document)=>{
            const obj = {
                shortID : document.shortID,
                redirectURL : document.redirectURL,
            };

            objects.push(obj);
        })
     })
     console.log(objects);
    

    res.render("home" , {

         allurls : objects,
    });
})

staticRouter.get("/signup", (req,res)=>{
    return res.render("signup");
})
staticRouter.get("/login", (req,res)=>{
    return res.render("login");
})

module.exports={
    staticRouter,
}