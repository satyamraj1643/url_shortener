const express = require("express");
const {URL } = require("../models/user")
const {  handlegenerateNewShortURL, handleShortIDQuery, handleAnalytics } = require("../controllers/user")
const router = express.Router();

router.post("/create", handlegenerateNewShortURL);
router.get("app/:shortId", handleShortIDQuery);
router.get("/info/analytics/", handleAnalytics);
// router.get("/test", async (req,res)=>{
//   const allurl = await  URL.find({});
//   console.log(allurl);

//   return res.render("home", {
//      urls : allurl
//   });
// })

module.exports={
    router,
}