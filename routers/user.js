const express=require('express')
const bcrypt=require('bcrypt')
const {User,validateUser,validUpdate}=require('../models/user')
// const config = require('config')

const router=new express.Router()

router.post('/user',async (req,res)=>{

    try{
        // console.log(config.get("jwtPrivateKey"))
        const {error}=validateUser(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        let check_user=await User.findOne({email:req.body.email})
        console.log("Its working")
        if(check_user)
            return res.status(400)
                        .send("User with the same email ID is created")
        
        console.log("Its working")
        
        user_data=await User(req.body)
        const salt=await bcrypt.genSalt(13)
        user_data.password=await bcrypt.hash(user_data.password,salt)
        console.log("Its working")
        some_user=await user_data.save()
        console.log("Its working")

        const token=some_user.generateAuthToken()
        console.log("Its working")
        res.status(200).header("x-auth-token", token).send(_.omit(user_data, ["password"]))
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/user',async(req,res)=>{
    const updates=Object.keys(req.body.update)
    // console.log("It's working")
    const allowedUpdates=['name','contact']
    const isVallidOperation=updates.every((updade)=>allowedUpdates.includes(updade))
    // console.log("It's working")
    if(!isVallidOperation){
        return res.status(400).send({error:"Invalid updae request"})
        // console.log("It's working")
    }
    const{error}=validUpdate(req.body.update);
    if(error) return res.status(400).send(error.details[0].message)
    try{
        const user_data=await User.findOne({email:req.body.email})
        // console.log("It's working")
        console.log(user_data)
        // console.log("It's working")

        if(!user_data){
            return res.status(404).send()
        }
        // console.log(updates)

        updates.forEach((update)=>user_data[update]=req.body.update[update])
        // console.log(user_data)
        await user_data.save()

        res.send(user_data)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router