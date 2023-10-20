const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },

    useremail:{
        type: String,
        required:true,
        unique:true,
    },
    userpass:{
        type: String,
        required:true,
    }
}, {timestamps:true})

const User = mongoose.model("NewUsers", userSchema);

module.exports ={
    User,
}