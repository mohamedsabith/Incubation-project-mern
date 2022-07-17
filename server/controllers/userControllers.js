import express from "express";
import { userSignupvalidation } from "../validation/userValidation.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import chalk from "chalk";
import userModel from "../models/userModel.js";
import applicationModel from "../models/applicationModel.js";

const router = express.Router();

//USER SIGNUP
export const userSignup = async (req, res) => {
  try {
    //signup validation
    const Validations = await userSignupvalidation(req.body);

    if (Validations.error) {
     return res.status(200).json({status:false,error:Validations.error.details[0].message.replace(/"/g, "")});
    }

    let {name,email,password} = req.body

    //checking user already exist
    const user = await userModel.findOne({email:email})

    if(user){
        return res.status(200).json({status:false,error:"Another account is using this email."})
    }
    //password hashing
    password = await bcrypt.hash(password, 12)

     // saving to DB
     const newUser = new userModel({
        name: name,
        email: email,
        password: password
     }) 

     await newUser.save(async(err,result)=>{
        if(err){
            console.log(err.message);
           return res.status(200).json({status:false,error:err.message})
        }

          const token=Jwt.sign({email:result.email,name:result.name,data:Date.now(),status:"Ok"},process.env.JWT_TOKEN,{expiresIn:"10h"})
          console.log(chalk.green("Register Successfully"));
          return res.status(200).json({status:true,message:'Register Successfully',token})
    })

  } catch (error) {
    console.log(chalk.red(error));
    return res.status(404).json(error)
  }
};


//USER SIGNIN
export const userSignIn = async (req,res) =>{

  try {
     let {email,password} = req.body 

     // checking if user already registered
     const user = await userModel.findOne({email:email})

     if(!user){
      return res.status(200).json({status:false,error:"User not found. Please check your mail."})
     }

      // Comparing plain password to hashed password
      await bcrypt.compare(password,user.password).then((status)=>{
        if(!status){
         return res.status(200).json({status:false,error:"Your password was incorrect. Please check your password."})
        }

        const token=Jwt.sign({email:user.email,name:user.name,data:Math.floor(Date.now() / 1000) + (60 * 60),status:"Ok"},process.env.JWT_TOKEN,{expiresIn:"5h"})
        console.log(chalk.green("Login Successfully."));
        return res.status(200).json({status:true,msge:"Login Successfully.",token})
     })

  } catch (error) {
    console.log(chalk.red(error));
   return res.status(404).json(error)
  }

}

//APPLICTION FORM SAVING
export const userApplictionForm = async(req,res) =>{
  
   let {values,country,incubationType,user} = req.body

    try {
       const newApplication = new applicationModel({
         user:user,
         name:values.name,
         address:values.address,
         country:country,
         state:values.state,
         city:values.city,
         pincode:values.pincode,
         email:values.email,
         number:values.number,
         companyName:values.companyName,
         teamDescription:values.teamDescription,
         productDescription:values.productDescription,
         problemSolve:values.problemSolve,
         uniqueSolution:values.uniqueSolution,
         propositionCustomer:values.propositionCustomer,
         competitors:values.competitors,
         revenueModel:values.revenueModel,
         potentialMarket:values.potentialMarket,
         planProducts:values.planProducts,
         incubationType:incubationType,
         businessProposal:values.businessProposal
       })

       await newApplication.save(async(err,result)=>{
         if(err){
          return res.status(200).json({error:err.message})
         }
         console.log(chalk.green("Application submit successfully."));
         return res.status(200).json({status:true,msge:"Application submit successfully."})
       })

    } catch (error) {
       console.log(chalk.red(error));
       return res.status(404).json(error)
    }

}

//USER APPLICATION STATUS
export const userApplicationStatus = async(req,res) =>{
  const userId = req.query.userId
  const Application=await applicationModel.findOne({user:userId})
  return res.status(200).json({status:Application.status})
}

//CHECKING USER ALREADY SUBMIT APPLICATION
export const userApplicationExist = async(req,res) =>{
   const application = await applicationModel.findOne({user:req.query.userId})
   if(application){
    return res.status(200).json({status:true})
   }else{
     return res.status(200).json({status:false})
   }
}
 

 
export default router;
