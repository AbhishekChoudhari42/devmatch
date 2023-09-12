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
    message: string,
    user: {
        username: String,
        email: String,
        bio: String,
        user_id: String,
        location: String,
    }
}


export const createOrUpdateUser = async (user:User) =>{
    try{

        console.log(user,'====user')
        connectDB()
        let currentUser = await User.findOne({user_id:user.user_id})
        if(currentUser?._id){

            await User.findByIdAndUpdate({ _id:currentUser?._id},user);

        } 
        else{
            
            await User.create(user);
        }
        
        return ({success:true})
    }
    catch(error){
        return ({success:false})
    }
}


export const getUser = async <ReturnUser>(email: string) => {

    try {


        connectDB()
        let currentUser = await User.findOne({ email: email })
        return { message: "success", user: currentUser }

    }
    catch (error) {
        return { message: "error" }
    }
}
type SearchUser = {
    user_id : string, 
    username : string,
    email : string
}
type Search={
    message:string,
    users : SearchUser[]
}
export const userSearch = async <Search>(username:string) =>{

    try {
        const foundUsers = await User.find({
            username: { $regex: new RegExp(username, "i") },
        },'user_id username email');

        if (!foundUsers || foundUsers.length === 0) {
            return {message:'',users:[]}
        }
        
        return {message:'users returned',users:foundUsers}
 
    } catch (error) {
 
        return {message:error,users:[]}
 
    }
}


export const followUser = async (user_id:string,followUser_id:string) => {

    try{

        connectDB()

        const user = await User.findOne({user_id:user_id})
        
        const followUser = await User.findOne({user_id:followUser_id})
        
        console.log(followUser,"xder")
       
        const status = !followUser.followers.includes(user_id) && !user.following.includes(followUser_id)
        
        if(status){
        
            await user.updateOne({$push:{following:followUser_id}})
            await followUser.updateOne({$push:{followers:user_id}})
            
            return {success:true,user:user.following,followUser:followUser.followers}
        
        }

        if(!status){
            
                await user.updateOne({$pull:{following:followUser_id}})
                await followUser.updateOne({$pull:{followers:user_id}})
            
                return {success:true,user:user.following,followUser:followUser.followers}

            
        }
            
        return {success:false}

    }catch(error){
        
        return {success:false,error}
    
    }

} 