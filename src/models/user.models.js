import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
    username:{
        type: String,
        required:true,
    },
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required: true,
    },
    refreshToken:{
        type: String,
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    try {
        if(!this.isModified("password")){
            return next()
        }
        this.password = await bcrypt.hash(this.password,10)
        next()
    } catch (error) {
        
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.gernateAccessToken = function(){
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
userSchema.methods.gernateRefreshToken = function(){
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

export const User = mongoose.model("User",userSchema)