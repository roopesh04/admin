const express=require('express')
const {Vendor,validateVendor,updatevalidateVendor}=require('../models/vender')


const router=new express.Router()

router.post('/vendor',async(req,res)=>{

  const{error} = validateVendor(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  try{
    // console.log(Vendor)
    let vendor_data=new Vendor(req.body);
    await vendor_data.save();
    return res.send(vendor_data)
  }catch(e){
    console.log(e)
     return res.status(400).send(e)
  }
})

router.patch('/vendor',async(req,res)=>{
  try{
  const{error}=updatevalidateVendor(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  user_email=req.body.emails[0].email
  console.log(user_email)

  // vendor_details=Vendor.find({"emails":{"email":req.body.emails[0].email}})
  vendor_details=Vendor.find({'emails.email':user_email})
  console.log(vendor_details.Query)

  res.send(vendor_details)

  }catch(e){
    console.log(e)
    return res.status(400).send(e)
  }
  
})

router.delete('/vendor',async (req,res)=>{
    try{
        console.log(req.body['Phone_number'])
        const vender_data=await Vender.findByIdAndDelete({Phone_number:req.body['Phone_number']})
        console.log(vender)

        if(!vender_data){
            res.status(404).send()
        }
        res.send(vender_data)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router