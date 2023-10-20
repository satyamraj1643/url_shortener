const {User} = require("../models/user");
const {setUser, getUser} = require("../service/auth")
const {v4:uuidv4} = require('uuid');

async function handleUserSignup(req,res){

    const {username, useremail, userpass} = req.body;
    const userPresent = await User.find({ useremail });

    if (userPresent.length > 0) {
      // A user with the same email exists, so you might want to handle this case.
      return res.send("<h3> User Already Exists</h3>");
    } else {
      // No user with the same email, so you can create the new user.
      await User.create({
        username,
        useremail,
        userpass
      });

      return res.render("home");
    }
}

async function handleUserLogin(req, res) {
    const { useremail, userpass } = req.body;
  
     const user = await User.findOne({useremail, userpass});
     if(!user){
        return res.render("login" , {
            error: "Invalid Username or password"
        });
  
     }

     const sessionId = uuidv4();
     setUser(sessionId,user);
     res.cookie("uid",sessionId);
     return res.redirect("/url")
  }
  
    





module.exports = {
    handleUserSignup,
    handleUserLogin
}