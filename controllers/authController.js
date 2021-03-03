var db = require("../config/db")
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
var User = require("../models/users")
var Photo = require("../models/photo")
exports.signup = async(req,res)=>{
    console.log(req.body)
    
    var user ={
id:uuidv4(),
username:req.body.username,
phone:req.body.phone,
password:req.body.password
    }
    await User.create(user).then((response)=>{
        console.log(response)
        return res.status(200).json(response)
    }).catch((err)=>{
        return res.status(500).json(err)
    })
}

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