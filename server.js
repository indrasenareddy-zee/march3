var express = require("express")
var mysql = require("mysql2")
const { Sequelize } = require("sequelize")
var authRoute = require("./routes/authRoute")
var userRoute = require("./routes/userRoute")
var {auth} = require("./middleware/auth")
var connection = require("./config/db")
var bodyParser = require("body-parser")
var AppError = require("./errorFiles/errorCodes.json")
var app = express()
app.use(bodyParser.json())
require("dotenv").config()

app.get("/testing",(req,res)=>{
return res.status(200).json(AppError.DATA_NOT_FOUND)
})
app.use("/auth",authRoute)
app.use("/user",auth,userRoute)
connection.sync({
}).then(()=>{
    console.log("sql connection established")
    app.listen(process.env.PORT)
}).catch((err)=>{
    console.log(err)
})
