import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new Schema({
    adminName:{
        type:true,
        requried :true,
    },
    email:{
        type:true,
        requried:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    admin:{
        type: Boolean,
    }
},{timestamps:true})

adminSchema.pre("save",async function(next) {
    try {
        if(!this.isModified("password")){
            return next()
        }
        this.password = await bcrypt.hash(this.password,10)
        next()
    } catch (error) {
        console.log(error);
    }
})
adminSchema.methods.gernateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
}
adminSchema.methods.gernateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const Admin = mongoose.model("Admin",adminSchema)