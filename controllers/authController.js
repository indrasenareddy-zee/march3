var db = require("../config/db")
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
var validation = require("./validationController")
var User = require("../models/users")
var Photo = require("../models/photo")
var bcrypt = require("bcrypt")
var errors = require("../errorFiles/errorCodes.json")
var jwt = require("jsonwebtoken")
exports.signup = async(req,res)=>{
   console.log("in")
    var {firstName,lastName,email,phone,password} = req.body
    if(!firstName || !lastName || !email || !phone || !password){
        return res.status(400).json(errors.BAD_REQUEST)
    }
console.log(validation.emailValidate(email))
    console.log(req.body)
    //check user already exists
    var user = await User.findOne({
       where:{ phone:req.body.phone}})
    console.log(user)
    if(user){
        return res.status(409).json({msg:"user already registered"})
    }
    var password = await bcrypt.hash(req.body.password,10)
    var user ={
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        password:password
            }
            console.log(user)
    await User.create(user).then((response)=>{
        console.log(response)
        return res.status(200).json(response)
    }).catch((err)=>{
        return res.status(406).json({messag:err.errors[0].message})
    })
}

exports.signin = async(req,res)=>{
 console.log(req.body.phone)
 var user = await User.findOne({
     where:{ phone:req.body.phone}})
 if(!user){
    return res.status(404).json({msg:"user not found"})
 }
 var matchPassword = await bcrypt.compare(req.body.password,user.password)
 console.log(matchPassword)
 if(!matchPassword){
    return res.status(400).json({msg:"invalid credentials"})
 }
 var token = await jwt.sign({username:user.username,id:user.id},'jwtsecret',{expiresIn:"1h"})
await user.update({
    token :token
})
console.log(user)
 return res.status(200).json(user)
}

// exports.logout = async(req,res)=>{

// }

exports.deleteUser = async(req,res)=>{
    console.log("in")
    await User.destroy({where:{
        id:req.params.userId
    } }).then((resp)=>{
        return res.status(200).json(resp)
    }).catch((err)=>{
        return res.status(404).json("not found")
    })
}

exports.showUsers = async(req,res)=>{
    // await User.findAll({})
   await User.findAll().then(async(result)=>{
       var photos = await Photo.findAll()
        return res.status(200).json({result,photos})
    }).catch((err)=>{
        return res.status(404).json(err)
    })

}