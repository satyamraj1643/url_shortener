const jwt = require("jsonwebtoken")
const secret = "satyam@123A";
//const sessionIdToUserMap = new Map(); // keeping the state of the components..

function setUser(user){
    // sessionIdToUserMap.set(id, user);
     const payload = {
       
       ...user
     };
    return jwt.sign(payload, secret);
}
function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secret);
    }
    catch(error){
        return null;
    }
   
}

module.exports = {
    setUser,
    getUser
}