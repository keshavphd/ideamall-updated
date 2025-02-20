import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const connectDatabase = async()=>{
 try{
    const connected = await mongoose.connect(process.env.MONGODB_URL);
    if(connected){
        console.log("Database Connected");
    }
 }catch(error){
    console.log("Database connection error");
 }  
}

export default connectDatabase;