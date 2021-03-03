var express = require("express")
var mysql = require("mysql2")
const { Sequelize } = require("sequelize")
var authRoute = require("./routes/authRoute")
var connection = require("./config/db")
var bodyParser = require("body-parser")
var app = express()
app.use(bodyParser.json())



app.use("/auth",authRoute)

connection.sync().then(()=>{
    console.log("sql connection established")
    app.listen(3089)
}).catch((err)=>{
    console.log(err)
})
