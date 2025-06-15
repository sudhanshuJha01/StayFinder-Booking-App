import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import rootRoute from "./route/index.js"
import mongoose from "mongoose"


dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT
const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());



mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Database connected ..."))
    .catch(err=>console.log(`error in database connection ${err}`))

app.use("/api/v1",rootRoute)


app.get("/test",(req,res)=>{
    res.send("Your backend is up sudhanshu ")
})

app.listen(PORT||3000,()=>{
    console.log(`Your backend server is running on the ${PORT}`);
})



