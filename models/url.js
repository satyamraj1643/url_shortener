const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID:{
        type: String,
        required: true,
        unique : true,
    },
    redirectURL:{
        type: String,
       
    },

    visitHistory:[{ timestamp : {
        type: Number
    }}],

    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "newusers",
    }
    
}, {timestamps: true});

const URL =  mongoose.model('URLs', urlSchema);

module.exports = {
    URL,
}