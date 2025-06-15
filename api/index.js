import dotenv from 'dotenv'
import dbConnect from "./db/index.js"
import app from './app.js'
dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT


dbConnect()
.then(
    app.listen(PORT||3000,()=>{
        console.log(`Your backend server is running on the ${PORT}`);
    })
    
)



