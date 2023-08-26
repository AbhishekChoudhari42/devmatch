"use server"
import connectDB from "@/db/mongodb"
import Post from "@/db/models/Post"
import { revalidatePath } from "next/cache";

interface Postparams{
    content:string,
    _id:string,
    user_id:string,
    username:string,
    path:string
}

export const createPost = async ({content,user_id,path}:Postparams) => {
    
    console.log("creating post")
    try{

        connectDB()
        console.log('connect db')
        await Post.create({content,user_id})
        console.log("submit")
        revalidatePath('/')
        console.log('created post')

    }catch(error){
        console.log(error)
    }

} 

export const fetchPosts = async (page:number) =>{

        const limit = 2
        const skip = (page - 1) * limit
        
        const path = '/'

        try{

            connectDB()
            console.log('connect')
            const posts = await Post.find().skip(skip).limit(limit).sort({ createdAt: "desc" });
                
            revalidatePath(path)
            
            console.log('posts===',{posts:posts})
            
            return {message:'success',posts:posts}
    
        }catch(error){

            return {message:'error occurred',posts:[]}
        
        }

}


export const likePost = async (postId:string,user_id:string) => {
    
    connectDB()
    
    const post = await Post.findById(postId);
    
    if (!post) {
        return {message:"error",success:false}
    }

    const status = !post?.likes.includes(user_id)
    console.log(status)
    if(status){
        await Post.findByIdAndUpdate(postId, { $push: { likes: user_id } });
        return {message:"post liked",success:true}
    }else{
        
        await Post.findByIdAndUpdate(postId, { $pull: { likes: user_id } });
        return {message:"post unliked",success:true}
    }

} 