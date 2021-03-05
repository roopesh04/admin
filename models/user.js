const mongoose=require('mongoose')
const joi = require('joi');
const jst=require('jsonwebtoken')
const config=require('config')

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
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

UserSchema.method("generateAuthToken",function(){
    const token=jwt.sign(
        {_id:this._id},
        config.get("jwtPrivateKey")
    )
    return token
})

const User=mongoose.model('User',UserSchema)

const validateUser=(body)=>{
    let schema=joi.object({
        email:joi.string().email().required(),
        name:joi.string().required(),
        contact:joi.number(),
        password:joi.string().required()
    })

    return schema.validate(body)
}

const validUpdate=(body)=>{
    let schema=joi.object({
        email:joi.string().email(),
        name:joi.string(),
        contact:joi.string(),
        password:joi.string()
    })

    return schema.validate(body)
}

module.exports={User,validateUser,validUpdate}