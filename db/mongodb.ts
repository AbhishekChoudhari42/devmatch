import mongoose from "mongoose";

const connectDB = () =>{
    try{
        mongoose.connect(String(process.env.MONGODB_URI));
        // console.log("connected")
    }
    catch(error){
        console.log(error)
    }
}

export default connectDB;