const { model } = require("mongoose");
const { URL } = require("../models/url");
var foxid = require("foxid");
  


async function handlegenerateNewShortURL(req,res){
   const shortID = foxid(5);
      const userid = req.user._doc._id;
      const body = req.body;
      console.log(userid);
      if(!body.url) return res.status(400).json({error: "Url is required"});

      const isPresent = await URL.findOne({
        redirectURL : req.body.url,
        createdBy:userid,
      })
      console.log(isPresent);

      if(isPresent){
        res.send(`<h3> An ID already linked to the URL <i><a href="${body.url}">${body.url}</a></i> is:  ${isPresent.shortID}</h3>`)
      }

      
      else{
        await URL.create({
          shortID : shortID,
          redirectURL:body.url,
          visitHistory : [],
          createdBy:userid,
        })

        res.send(`<h3> New Alias Created for ${body.url} : ${shortID}`);

      }
      

      //console.log(URL.find({}));


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
    res.json({RedirectURL : `${entry.redirectURL}`});
    
}

async function handleAnalytics(req,res){
   const idasked = req.query.shortIdEntered;

  console.log(idasked);

   const cnt = await URL.findOne({
    shortID:idasked,
   })

   if(!cnt){
    res.send(`<h3> We could not find any associated URL with ${idasked},create one for free by going back!`)
    
   }
   
   else{
    const cntval = cnt.visitHistory.length
    const url = cnt.redirectURL;
    res.send(`<h3> The URL associated with ${idasked} is <i><a href="${url}">${url}</a></i> and number of times it has been invoked is ${cntval}`);
    console.log(cntval);
   }
   
   


  
}



module.exports= {

     handlegenerateNewShortURL,
     handleShortIDQuery,
     handleAnalytics,
}
