const mongoose=require('mongoose')
const joi = require('joi');

const contact_details=new mongoose.Schema({
  number:{
    type:Number,
    unique:true
  },
  number_holder:{
    type:String
  }
})

const address_propertie=new mongoose.Schema({
  address:{
    type:String,
    required:true
  },
  coordinates:{
    lat:{
      type:Number,
    },
    long:{
      type:Number,
    },
  }
})

const VendorSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  emails:[{
    email:
    {
      type:String,
      unique:true
    }
  }],
  contact_list:[contact_details],
  addresses:[address_propertie],
 types:[{
   type:
   {
    type:String,
   enum:['MILLER','WHOLESALE-DEALER','WHOLESALE-MERCHANTS','WHOLESALE-TRADERS','BROKER','CANVASSING-AGENT','IMPORTER-EXPORTER'],
   required:true
  }
  }],
  deals_in:[{
    deal:
    {
      type:String,
    required:true
  }
  }]
},{
    timestamps:true,
})

const Vendor=mongoose.model('Vendor',VendorSchema)



const validateVendor = (body) => {
  // console.log("IT's getting validated")
  let schema =joi.object({
    name:joi.string().required(),
    emails:joi.array().items({email:joi.string().email().required()}),
    contact_list:joi.array().items({number:joi.number().required(),number_holder:joi.string().required()}).required(),
    addresses:joi.array().items({address:joi.string().required()}).required(),
    types:joi.array().items({type:joi.string().required()}),
    deals_in:joi.array().items({deal:joi.string().required()})
  })
  // console.log("IT's getting validated")
  return schema.validate(body);
}

const updatevalidateVendor = (body) => {
  // console.log("IT's getting validated")
  let schema =joi.object({
    name:joi.string(),
    emails:joi.array().items({email:joi.string().email()}),
    contact_list:joi.array().items({number:joi.number(),number_holder:joi.string()}),
    addresses:joi.array().items({address:joi.string()}),
    types:joi.array().items({type:joi.string()}),
    deals_in:joi.array().items({deal:joi.string()})
  })
  // console.log("IT's getting validated")
  return schema.validate(body);
}

module.exports={Vendor,validateVendor,updatevalidateVendor}
