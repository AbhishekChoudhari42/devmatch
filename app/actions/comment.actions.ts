"use server"

import Comment from "@/db/models/Comment"
import Post from "@/db/models/Post"
import connectDB from "@/db/mongodb"
import { revalidatePath } from "next/cache"

export const addComment = async (postId: string, user_id: string, content: string, username: string) => {
    try {
        connectDB()
        const post = await Post.findById(postId);

        if (!post) {
            return { success: false }
        }

        const comment = await Comment.create({ content, postId, user_id, username })

        await Post.findByIdAndUpdate(postId, { $push: { comments: comment?._id } });

        return { success: true }

    } catch (error) {
        return { success: false }
    }
}
interface CommentsType {
    message: string,
    comments: any,
    isNextPage: boolean
}
export const fetchComments = async<CommentsType>(page: number, postId: string) => {
    const limit = 10
    const skip = (page - 1) * limit

    try {

        connectDB()
        const comments = await Comment.find({ postId }).skip(skip).limit(limit).sort({ createdAt: "desc" });

        const totalDocs = await Comment.countDocuments()
        const isNextPage = page <= (Math.ceil(totalDocs / limit))

        return { message: 'success', comments: comments, isNextPage }

    } catch (error) {

        return { message: error, comments: [], isNextPage: false }

    }

}


export const likeComment = async (commentId: string, user_id: string) => {

    try {


        connectDB()

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return { success: false }
        }

        const status = !comment?.likes.includes(user_id)

        if (status) {
            await Comment.findByIdAndUpdate(commentId, { $push: { likes: user_id } });
        }

        if (!status) {
            await Comment.findByIdAndUpdate(commentId, { $pull: { likes: user_id } });
        }

        return { success: true }

    } catch (error) {
        return { success: false }
    }
}

// update
export const updateCommentById = async (comment_id: string, content: string, user_id: string) => {

    try {
        connectDB()
        const comment = await Comment.findById(comment_id);

        if (comment?.user_id === user_id) {
        
            const res = await Comment.updateOne({ _id: comment._id }, { content: content })
        
            return { success: true, comment: comment?.user_id, requser: user_id }

        }

        return { message: 'auth required', success: false }

    } catch (error) {
    
        return { message: error, success: false }
    
    }
}

// delete
export const deleteCommentById = async (comment_id: string, user_id: string) => {

    try {
        connectDB()
        const comment = await Comment.findById(comment_id);
        
        if (comment?.user_id === user_id) {
            console.log("comment====",comment)
            const res = await Comment.deleteOne({ _id: comment._id });
     
            return { success: true, comment: comment?.user_id, requser: user_id }
        
        }
        
        return { message: 'auth required', success: false }

    } catch (error) {

        return { message: error, success: false }
    
    }
}