import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user:{
    type:String,
    required:true
  },
   name: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  pincode:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  number:{
    type:String,
    required:true
  },
  companyName:{
    type:String,
    required:true
  },
  teamDescription:{
    type:String,
    required:true
  },
  productDescription:{
    type:String,
    required:true
  },
  problemSolve:{
    type:String,
    required:true
  },
  uniqueSolution:{
    type:String,
    required:true
  },
  propositionCustomer:{
    type:String,
    required:true
  },
  competitors:{
    type:String,
    required:true
  },
  revenueModel:{
    type:String,
    required:true
  },
  potentialMarket:{
    type:String,
    required:true
  },
  planProducts:{
    type:String,
    required:true
  },
  incubationType:{
    type:String,
    required:true
  },
  businessProposal:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:"Pending",
  },
  slotAllocation:{
     type:Boolean,
     default:false
  },
  created:{
    type:Date,
    default:Date.now()
  }
});

const applicationModel = mongoose.model("Applications", applicationSchema);

export default applicationModel;