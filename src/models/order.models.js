import mongoose , {Schema} from "mongoose";

const orderSchema = new Schema({
    products:{
        type:Array,
        required:true,
    },
    orderPlacedBy:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    address:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    completion:{
        type:Boolean,
        required:true,
    }
},{timestamps:true}) 

export const Order = mongoose.model("Order",orderSchema)