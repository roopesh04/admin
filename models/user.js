const mongoose=require('mongoose')
const joi = require('joi');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    contact:{
        type:Number,
        trim:true
    },
},{
    timestamps:true,
})

const User=mongoose.model('User',UserSchema)

const validateUser=(body)=>{
    let schema=joi.object({
        email:joi.string().email().required(),
        name:joi.string().required(),
        contact:joi.number()
    })

    return schema.validate(body)
}

const validUpdate=(body)=>{
    let schema=joi.object({
        email:joi.string().email(),
        name:joi.string(),
        contact:joi.string()
    })

    return schema.validate(body)
}

module.exports={User,validateUser,validUpdate}