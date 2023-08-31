"use server"

import User from "@/db/models/User"
import connectDB from "@/db/mongodb"
type User = {
    username: String,
    email: String,
    bio: String,
    user_id: String,
    location: String,
}

type ReturnUser = {
    message : string,
    user:User
}
export const getUser = async (email:string) => {

    try{
        
        
        connectDB()
        let currentUser = await User.findOne({email:email})
        return {message:"success",user:currentUser as User}
        
    }
    catch(error){
        return {message:"error"}
    }
}