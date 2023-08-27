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
        await axios.post("/api/user/createuser",{user:user})
        console.log("success")
    }catch(error){
        console.log(error)
    }
}


export async function getUser(email:string){
    try{
      
        const res = await axios.get(`/api/user/fetchuser?email=${email}`)
        // console.log(res.data.user)
        return res.data.user

    }catch(error){
        console.log(error)
    }
}

export async function fetchPosts(page:number){
    try{

        return await axios.get(`/posts/fetch?page=${page}`);

    }catch(error){

        return error

    }
}