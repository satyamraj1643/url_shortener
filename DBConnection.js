
const mongoose = require("mongoose");

async function connectMongoDB(url){
  return ( await mongoose.connect(url)
  .then(()=>{
    console.log("Database Connected");
  })
  .catch(()=>{
    console.log("An error ocurred while connecting Database");
  }))
  
}

module.exports= {
    connectMongoDB,
}