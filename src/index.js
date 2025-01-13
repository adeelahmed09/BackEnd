import connectDb from "./db/connectdb.js";
import {app} from "./app.js";
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

connectDb()
.then(() => {
    app.on("error",(err)=>{
        console.log("ERR",err);
    })
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`APP is listening on Port : ${process.env.PORT}`);
    })
})