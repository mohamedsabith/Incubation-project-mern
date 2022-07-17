import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  slotSection:{
    type:String
  },
  slotNumber:{
    type:Number,
    require:true
  },
  isBooked:{
    type:Boolean,
    default:false
  },
  applicationId:{
    type:mongoose.Types.ObjectId,
    ref:"Applications",
  },
  createdAt : {
    type: Date,
    default : new Date(),
  },
});

const slotModel = mongoose.model("Slot", slotSchema);

export default slotModel;