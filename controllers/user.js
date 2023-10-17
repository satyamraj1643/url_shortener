const { model } = require("mongoose");
const { URL } = require("../models/user");
var foxid = require("foxid");
  


async function handlegenerateNewShortURL(req,res){
      const shortID = foxid(5);
      const body = req.body;
      if(!body.url) return res.status(400).json({error: "Url is required"});
      await URL.create({
        shortID : shortID,
        redirectURL:body.url,
        visitHistory : [],
      })

      console.log(URL.find({}));

      return res.json({ id:shortID })

}

async function handleShortIDQuery(req,res){
     const shortId = req.params.shortId;
     console.log(shortId);
     const entry = await URL.findOneAndUpdate({
      shortID:shortId
     },{$push :{
      visitHistory: {
        timestamp : Date.now(),
      }
     }})
    console.log(entry.redirectURL);
    res.redirect(entry.redirectURL);
    //res.end("<h1>Hello! </h1>");
}



module.exports= {

     handlegenerateNewShortURL,
     handleShortIDQuery,
}
