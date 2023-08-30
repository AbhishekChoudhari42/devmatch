"use server"

import Comment from "@/db/models/Comment"
import Post from "@/db/models/Post"
import connectDB from "@/db/mongodb"
import { revalidatePath } from "next/cache"

export const addComment = async (postId:string,user_id:string,content:string,username:string) => {
    try{
        connectDB()
        const post = await Post.findById(postId);
        
        if (!post) {
            return { success:false }   
        }

        const comment = await Comment.create({content,postId,user_id,username})
        
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment?._id}});       

        revalidatePath(`/comment/${postId}`)

    }catch(error){
        return {success:false}
    }
}

export const fetchComments = async(page:number,postId:string) => {
    const limit = 10
    const skip = (page - 1) * limit

    try{

        connectDB()
        const comments = await Comment.find({postId}).skip(skip).limit(limit).sort({ createdAt: "desc" });
        return {message:'success',comments}

    }catch(error){

        return {message:error,comments:[]}
    
    }



}