const express = require("express");
const {handleUserSignup, handleUserLogin} = require("../controllers/user")
const Creationrouter = express.Router();

Creationrouter.post("/signup", handleUserSignup);
Creationrouter.post("/login", handleUserLogin);




module.exports = {
    Creationrouter,
};