// create or update user

import axios from "axios";

interface User{
    user_id:string,
    username:string,
    location:string,
    email:string,
    bio:string,
    
}
export async function createOrUpdateUser(user:User) {
    try{
        await axios.post("/api/user/createuser",{user})
        console.log("success")
    }catch(error){
        console.log(error)
    }
}