import express from "express"
import cookieParser from "cookie-parser"
import rootRoute from "./route"
import cors from "cors"
const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL||'*',
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());


app.use("/api/v1",rootRoute)


app.get("/test",(req,res)=>{
    res.send("Your backend is up sudhanshu ")
})

export default app