import express from "express"
import dotenv from "dotenv"
import conn  from "./src/configs/db.js"
import cloudinary from "./src/configs/cloudinary.js"
import router from "./src/router/router.js"
dotenv.config()

const port = process.env.PORT
const app = express()
conn.connect()
.then(()=>{
    console.log("connection db")
})
.catch(()=>{
    console.log("DB Not Connnection")
})

async function checkCloudinary (){
    try{
        const result = await cloudinary.api.ping()
        console.log("Cloudinary Connection",result)
    }catch(err){
        console.log("cloudinary connection is faild",err)
    }
}

checkCloudinary()

app.use(express.json())
app.use('/',router)
app.listen(port,()=>{
    console.log(`server is runing : http://localhost:${port}`);
    
})

