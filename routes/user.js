const express = require("express");
const {URL } = require("../models/user")
const {  handlegenerateNewShortURL, handleShortIDQuery } = require("../controllers/user")
const router = express.Router();

router.post("/", handlegenerateNewShortURL);

router.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortID: shortId });
    const val = entry.redirectURL;
    console.log(val);
    
    
  });
  

module.exports={
    router,
}