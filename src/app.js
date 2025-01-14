import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express()
const dataLimit = "16KB"
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit:dataLimit}));
app.use(express.urlencoded({extended:true,limit:dataLimit}))

app.use(cookieParser())

import userRouter from  "./routes/user.routes.js"
app.use("/api/v1/user",userRouter)

export  {app}