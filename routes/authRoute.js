var express = require("express")
var router = express.Router()
var {signup,deleteUser,showUsers} = require("../controllers/authController")

router.post("/signup",signup)
router.get("/delete/:userId",deleteUser)
router.get("/showusers",showUsers)

module.exports = router
