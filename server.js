var express = require("express")
var mysql = require("mysql2")
const { Sequelize } = require("sequelize")
var authRoute = require("./routes/authRoute")
var userRoute = require("./routes/userRoute")
var {auth} = require("./middleware/auth")
var connection = require("./config/db")
var bodyParser = require("body-parser")
var app = express()
app.use(bodyParser.json())
require("dotenv").config()


app.use("/auth",authRoute)
app.use("/user",auth,userRoute)
connection.sync().then(()=>{
    console.log("sql connection established")
    app.listen(process.env.PORT)
}).catch((err)=>{
    console.log(err)
})
