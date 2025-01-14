import mongoose , {Schema} from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    images:{
        type: Array,
        required:true
    },
    discription:{
        type:String,
        required:ture,
    },
    catogory:{
        type: Schema.Types.ObjectId,
        ref:"Admin"
    }
},{timestamps:true})

export const Product = mongoose.model("Product".productSchema)