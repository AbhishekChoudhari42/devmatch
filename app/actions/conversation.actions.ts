"use server"
import Conversation from "@/db/models/Conversation";
import Message from "@/db/models/Message";
import connectDB from "@/db/mongodb"
import { pusherServer } from "@/lib/pusher"

type Conversation = {
    _id:string,
    members:[string],
    updatedAt:string,
    createdAt:string
}
export const getOrCreateConversation = async <Conversation>(user1:string,user2:string) =>{
    
    connectDB()
    const conversation = await Conversation.findOne({
        members: { $all: [user1, user2] },
    });
    
    if(conversation){
        return {conversation:conversation}
    }

    const newConversation = await Conversation.create({members:[user1,user2]})

    return {conversation:newConversation}
}

export const sendMessage = async (conversationId:string,sender:string,content:string) =>{
    
    connectDB()
    
    if(!conversationId){
        return {success:false}
    }

    const message = {conversationId,sender,content}
    pusherServer.trigger(conversationId, 'incoming-message', message)
    const newMessage = await Message.create({conversationId,sender,content})

    return {success:true}
}



export const getMessagesById = async (conversationId:string) =>{
    
    connectDB()
    
    if(!conversationId){
        return {success:false,messages:[]}
    }

    const messages = await Message.find({conversationId:conversationId})

    return {success:true,messages:messages}
}
