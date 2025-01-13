import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
    try {
        const connectionDb = await mongoose.connect(`${process.env.DATABASE}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB:HOST : ${connectionDb.connection.host}`);
    } catch (error) {
        console.log(`ERROR !! Faild To Connect : ERR : ${error}`);
    }
}

export default connectDb