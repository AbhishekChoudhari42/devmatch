"use server"

import User from "@/db/models/User"
import connectDB from "@/db/mongodb"

export const getUser = async (email:string) => {

    try{
        
        
        connectDB()
        let currentUser = await User.findOne({email:email})
        return {message:"success",user:currentUser}
        
    }
    catch(error){
        return {message:"error"}
    }
}