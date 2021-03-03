const { Sequelize } = require("sequelize")
module.exports = new Sequelize('test','root','',{
    dialect:'mysql'
})
// exports.User = require("../models/users")