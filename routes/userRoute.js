var express = require("express")
var router = express.Router()
var {uploadPhoto,photos,getPhotos,createPost} = require("../controllers/userController")
router.post('/upload',photos,uploadPhoto)
router.get('/myphotos/:userId',getPhotos)
router.post('/createpost',photos,createPost)

module.exports = router
