import adminModel from "../models/adminModel.js"
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import chalk from "chalk";
import mongoose from "mongoose";
import applicationModel from "../models/applicationModel.js";
import slotModel from "../models/slotModel.js";

//ADMIN SIGNIN
export const adminSignIn = async(req,res) =>{
  
    try {

        const {email,password} =req.body

        const admin = await adminModel.findOne({email:email})

        if(!admin){
            return res.status(200).json({status:false,error:"You entered email is incorrect. Please check your email."})
           }

        await bcrypt.compare(password,admin.password).then(async(status)=>{
            
        if(!status){
           return res.status(200).json({status:false,error:"Your password was incorrect. Please check your password."})
        }
    
        const token = await Jwt.sign({id:admin.id,username:admin.email,date:Date.now()},process.env.JWT_ADMIN_TOKEN,{expiresIn:"1d"})
     
        console.log(chalk.green("Login Successfully"));

        return res.status(200).json({status:true,msge:"Login Successfully",token})
          
    })

    } catch (error) {
        console.log(chalk.red(error));
    }
      
}

export const getAllApplications = async(req,res) =>{

     try {

        const applications = await applicationModel.find({})

        return res.status(200).json(applications)
        
     } catch (error) {

        return res.status(404).json(error)
        
     }

}

export const approveApplication = async(req,res) =>{

  try {
    
    const {applicationId} = req.body

    const id = mongoose.Types.ObjectId(applicationId)
  
    await applicationModel.findByIdAndUpdate({_id:id},{$set:{status:"Approved"}})

    return res.status(200).json({status:true,message:"Application approved"})

  } catch (error) {
     console.log(error);
     return res.status(404).json(error)
  }

}

export const declinedApplication = async(req,res) =>{

    try {

        const {applicationId} = req.body

        const id = mongoose.Types.ObjectId(applicationId)

        await applicationModel.findByIdAndUpdate({_id:id},{$set:{status:"Declined"}})

        return res.status(200).json({status:true,message:"Application Declined"})
        
    } catch (error) {
    
     console.log(error);

     return res.status(404).json(error)
    }

}

export const processApplication = async(req,res) =>{

    try {

        const {applicationId} = req.body

        const id = mongoose.Types.ObjectId(applicationId)

        await applicationModel.findByIdAndUpdate({_id:id},{$set:{status:"Process"}})

        return res.status(200).json({status:true,message:"Application Process"})
        
    } catch (error) {
    
     console.log(error);

     return res.status(404).json(error)
    }

}

export const getAllSlots = async(req,res) =>{

    try {
        
        const slots = await slotModel.find({})

        const sectionA = slots.filter((slot)=>{
            return slot.slotSection === 'A'
        })
        const sectionB = slots.filter((slot)=>{
            return slot.slotSection === 'B'
        }) 
        const sectionC = slots.filter((slot)=>{
            return slot.slotSection === 'C'
        }) 

        const sectionD = slots.filter((slot)=>{
            return slot.slotSection === 'D'
        }) 

        const sectionE = slots.filter((slot)=>{
            return slot.slotSection === 'E'
        }) 

        return res.status(200).json({sectionA,sectionB,sectionC,sectionD,sectionE})

    } catch (error) {
        console.log(error);
        return res.status(404).json(error)
    }

}

export const getAllApprovedApplication = async(req,res) =>{
 
    try {
        
       const approvedApplication = await applicationModel.find({status:"Approved"})

       return res.status(200).json(approvedApplication)

    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }

}
 
export const slotAlocation = async(req,res) =>{ 

   try {
     const {application,slot} = req.body

     await slotModel.findOneAndUpdate({slotSection:slot.slotSection,slotNumber:slot.slotNumber},{$set:{isBooked:true,applicationId:application._id}})

     await applicationModel.findByIdAndUpdate({_id:application._id},{$set:{slotAllocation:true}})

     return res.status(200).json({message:"slot successfully allocated"})

   } catch (error) {
    console.log(error);
    return res.status(200).json(error)
   }

}

// const slotCreating = async() =>{
//    for(var i=1;i<=10;i++){
//     const slot = new slotModel({
//         slotNumber:i
//     })
//     await slot.save()
//    }
// }
// slotCreating()




