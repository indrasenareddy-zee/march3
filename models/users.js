const Sequelize = require("sequelize")
const db = require("../config/db")
 var Photo=require("../models/photo")
 const Post = require("../models/postModel")
const User = db.define("users", {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue:Sequelize.UUIDV4
    },
    email:{
        allowNull:false,
        validate:{
         isEmail:{
             args:true,
             msg:"Email must contain '@'"
         },
            notNull:{
                msg:'Email cannot be empty'
            }
        },
        unique:true,
        type: Sequelize.STRING
    },
    firstName: {
        allowNull:false,
       validate:{
        len:{
            args:[1,30],
            msg:"First Name Must contain min 1 charecter"
        },
           notNull:{
               msg:'Please enter your firstname'
           }
       },
        type: Sequelize.STRING
    },
    lastName:{
        allowNull:false,
        validate:{
            len:{
                args:[1,30],
                msg:"Last Name Must contain min 1 charecter"
            },
notNull:{
    msg:'Please enter your lastname'
}
        },
        type: Sequelize.STRING
    },
    phone: {
        allowNull:false,
        validate:{
            notNull:{
                msg:'phone Number Required'
            },
            isNumeric:true
        },
        type: Sequelize.STRING,
        unique:true
    },
    password: {
        allowNull:false,
        validate:{
 min:8,
 max:20,
 notNull:{
     msg:'Password cannot be empty'
 }
        },
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    }
})


Photo.belongsTo(User)
Post.belongsTo(User)
module.exports = User