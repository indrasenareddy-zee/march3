const { response } = require("express")
var db = require("../config/db")

    exports.emailValidate= (email,next)=>{
        console.log("in")
        if(!email.includes('@')){ 
            return false
        }
       return true
    }
