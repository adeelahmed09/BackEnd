import mongoose , {Schema} from "mongoose";

const catogoriesSchema = new Schema({
    name:{
        type:String,
        required:ture
    }
},{timestamps:true})

export const Catogory = mongoose.model("Catogory",catogoriesSchema)