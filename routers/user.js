const express=require('express')
const {User,validateUser,validUpdate}=require('../models/user')

const router=new express.Router()

router.post('/user',async (req,res)=>{

    try{
        const {error}=validateUser(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        let vendor_details=new User(req.body)
        await vendor_details.save()
        res.send(vendor_details)
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