const fs = require("fs");
const {getUser}  = require('../service/auth')

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `\n ${Date.now()} : ${req.method} : ${req.path}`, (err, data) => {
            if (err) {
                console.log("An error ocurred while taking log!");
                res.end("Server has some issues , please try again later");
            }
            next();
        });
    }
}async function restrictToLoggedInUserOnly(req,res,next){
    const useruid = req.cookies.uid;
    if(!useruid) return res.redirect("/login");
    const user = getUser(useruid);

    if(!user) return res.redirect("/login");
    req.user = user;

    next();

}

module.exports = {
    logReqRes,
    restrictToLoggedInUserOnly,
}