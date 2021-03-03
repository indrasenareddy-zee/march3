const Sequelize = require("sequelize")
const db = require("../config/db")
const Photo = db.define('photos',{
    id:{type:Sequelize.STRING,
    primaryKey:true},
    photo :{type:Sequelize.STRING}
})

module.exports = Photo