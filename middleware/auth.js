const jwt = require("jsonwebtoken");
var User = require("../models/users")
var db=require("../config/db")
exports.auth = async(req,res,next)=>{
if(!req.headers.authorization){
    return res.status(409).json({message:"you are not authorized to do this"})

}
const token = req.headers.authorization.split(' ')[1];

var decoded;
await jwt.verify(token,"jwtsecret",(err,resp)=>{
    if (err){
        console.log("in")
        return res.status(409).json({message:"invalid token"})
    }
decoded = resp
})
req.user = await User.findByPk(decoded.id)
next()
}
