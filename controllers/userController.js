var User = require("../models/users")
var db = require("../config/db")
var Photo = require("../models/photo")
var Post = require("../models/postModel")
var multer = require("multer")
const sharp = require('sharp');
const path = require('path')

var storage = multer.diskStorage({
    destination:path.resolve(__dirname, "../public","photos"),
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })
  exports.photos = upload.fields([{ name: 'photo', maxCount: 1 }])
const { v4: uuidv4 } = require('uuid');
exports.uploadPhoto = async(req,res)=>{
   console.log(req.files)
   req.files.photo.forEach(async photo=>{
       var photo = {
           id:uuidv4(),
           photo:photo.path,
           userId:req.user.id
       }
       await Photo.create(photo).then((respone)=>{
           console.log(respone)
           return res.status(200).json(respone)

       }).catch((err)=>{
           console.log(err)
           return res.status(200).json({err})

       })
   })

}

exports.createPost = async(req,res)=>{
 var post = {
     id:uuidv4(),
     content:req.body.content,
     userId :req.user.id
 }
 var newPost = await Post.create(post)
 console.log("newpost",newPost)
if(req.files.photo.length){
    console.log(req.files.photo.length)
   
    req.files.photo.forEach(async photo=>{
        console.log("in")
        var photo ={
            id:uuidv4(),
            photo:photo.path,
            postId:newPost.id,
            userId:req.user.id,
            
        }
       await Photo.create(photo).then(async(response)=>{
        console.log("newphoto",response)
      }).catch((err)=>{
          console.log(err)
      })
    })
  
}

return res.status(200).json({newPost})
}

exports.getPhotos = async(req,res)=>{
var photos = await Photo.findAll({
    where:{userId:req.params.userId}
})
return res.status(200).json(photos)

}