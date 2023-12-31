"use client"
import { getMessagesById, getOrCreateConversation, sendMessage } from '@/app/actions/conversation.actions'
import { getUserById } from '@/app/actions/user.actions'
import Button from '@/components/ui/Button'
import Message from '@/components/ui/Message'
import { pusherClient } from "@/pusher/pusher"
import useUserStore from '@/state/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRef } from 'react'
import { v4 as uuid } from 'uuid';

import React, { useEffect, useState,ElementRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'

const page = () => {

    const { user } = useUserStore()
    const params = useParams()
    const [messageContent, setMessageContent] = useState<any>([])
    const [messageList, setMessageList] = useState<any>([])
    const [conversationId, setConversationId] = useState<string>('')
    const messageListRef = useRef<ElementRef<"div">>(null)
    const sendMessageQuery = useMutation(
        {
            mutationFn: async () => {
                console.log("currentMessage==",messageContent)
                const res = await sendMessage(conversationId, user.user_id, messageContent)
                setMessageList((prev:any) => [...prev, {conversationId, sender: user.user_id, content: messageContent}])
                setMessageContent('')
                return res.success
            },
            onSuccess:()=>{
                
            }
        }
    )

    const handleMessage = () => {
        sendMessageQuery.mutate()
    }

    const scrollToBottom = () => {

        messageListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {

        scrollToBottom()
        if(user){

        
        const fetchConversation = async () => {
            const res = await getUserById(String(params.user_id))
            const conversationResponse = await getOrCreateConversation(String(user?.user_id), String(params.user_id))
            const msgRes = await getMessagesById(String(conversationResponse?.conversation._id))
            setMessageList(msgRes?.messages)
            console.log(msgRes)
            setConversationId(String(conversationResponse?.conversation._id))
        }
        fetchConversation()

        }

    }, [user])
    
    useEffect(()=>{

        console.log(conversationId,"===conversationId")  
        if(conversationId){

            
            const channel = pusherClient.subscribe(conversationId)
            
            channel.bind('incoming-message', (message: { conversationId: string, sender: string, content: string }) => {
                console.log("pusherrr")
                if(message.sender !=  user.user_id){
                    setMessageList((prev:any) => [...prev, message])
                }
            })
            
        }     
    
        return () => {
            pusherClient.unsubscribe(conversationId)
        }
    
    },[conversationId])

    useEffect(() => {
    
        scrollToBottom()
    
    }, [messageList])







    return (
        <>
            <div className='w-full text-white relative flex flex-col flex-grow '>

                <div className='w-full border border-neutral-800 rounded-md h-12 flex-grow mb-4 p-4 overflow-y-scroll'>
                    {messageList && messageList?.length > 0 && messageList.map((message: any) => {
                        return <Message key={uuid()} content={message?.content} sender={message?.sender} />
                    })}
                    <div ref={messageListRef}></div>
                </div>

                <div className='bg-neutral-800 w-full rounded-md items-center p-2 flex bottom-0'>
                    <input placeholder='message' value={messageContent} onChange={(e) => { setMessageContent(()=>{return e.target.value}) }} className='flex-grow mr-2 rounded-md p-2 bg-neutral-800 text-neutral-200' type="text" />
                    <Button style='w-12 bg-violet-500 border-violet-500' handleClick={handleMessage} isLoading={sendMessageQuery.isLoading}><AiOutlineSend size={20} className="text-white" /></Button>
                </div>
            </div>
        </>

    )
}

export default page