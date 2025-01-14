import {User} from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password,fullName} = req.body
    if(!username && !email && !password && !fullName){
        return res
        .status(401)
        .json(new ApiError(
            401,
            {},
            "All Field are Required"
        ))
    }
    const exsitedUser = await User.findOne({username})
    const exsitedEmail = await User.findOne({email})

    if(exsitedUser){
        return res
        .status(401)
        .json( new ApiResponse(
            401,
            {},
            "User Is Already Exsited"
        ))
    }
    if(exsitedEmail){
        return res
        .status(401)
        .json( new ApiResponse(
            401,
            {},
            "Email Is Already Exsited"
        ))
    }
    const user = await User.create({
        username,
        password,
        email,
        fullName
    })
    const userCreated = await User.findById(user._id).select("-password ")
    if(!userCreated){
        return res.status(501)
        .json(new ApiResponse(
            501,
            {},
            "Server Error : Something went worng during saving Data"
        ))
    }
    console.log("done");
    return res.status(200)
    .json(new ApiResponse(
        200,
        {user:userCreated},
        "User Successfull Created"
    ))

})

export {
    registerUser
}