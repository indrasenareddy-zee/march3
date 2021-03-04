const { UUID } = require("sequelize")
const Sequelize = require("sequelize")
const db = require("../config/db")
 var Photo=require("../models/photo")

 const Post = db.define('posts',{
     id:{
         type:Sequelize.STRING,
         primaryKey:true
     },
     content:{type:Sequelize.STRING}
        })

        Photo.belongsTo(Post)

        module.exports = Post