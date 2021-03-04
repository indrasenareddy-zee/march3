const Sequelize = require("sequelize")
const db = require("../config/db")
 var Photo=require("../models/photo")
 const Post = require("../models/postModel")
const User = db.define("users", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    }
})


Photo.belongsTo(User)
Post.belongsTo(User)
module.exports = User