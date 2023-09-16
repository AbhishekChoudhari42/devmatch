"use client"
import { getMessagesById, getOrCreateConversation, sendMessage } from '@/app/actions/conversation.actions'
import { getUserById } from '@/app/actions/user.actions'
import Button from '@/components/ui/Button'
import Message from '@/components/ui/Message'
import useUserStore from '@/state/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'

const page = () => {

    const { user } = useUserStore()
    const params = useParams()
    const [message, setMessage] = useState<any>([])
    const [messageList, setMessageList] = useState<any>([])
    const [conversationId, setConversationId] = useState<string>('')
    const sendMessageQuery = useMutation(
        {
            mutationFn: async () => {
                const res = await sendMessage(conversationId,user.user_id,message)
             }
        }
    )

    const handleMessage = () => {
        sendMessageQuery.mutate()
    }

    useEffect(() => {
        const fetchConversation = async () => {
            const res = await getUserById(String(params.user_id))
            const conversationResponse = await getOrCreateConversation(String(user?.user_id), String(params.user_id))
            console.log(conversationResponse?.conversation._id)
            const msgRes = await getMessagesById(String(conversationResponse?.conversation._id))
            setMessageList(msgRes?.messages)
            console.log(msgRes)
            setConversationId(String(conversationResponse?.conversation._id))
        }
        if (user) {
            fetchConversation()
        }

        return

    }, [user])


    return (
        <>
            <div className='w-full text-white relative flex flex-col flex-grow '>
             
             <div className='w-full border border-neutral-800 rounded-md h-12 flex-grow mb-4 p-4'>
             {messageList?.length > 0 && messageList.map((message:any)=>{
                return <Message key={message?._id} content={message?.content} sender={message?.sender} />
             })}
             </div>

            <div className='bg-neutral-800 w-full rounded-md items-center p-2 flex bottom-0'>
                <input placeholder='message' value={message} onChange={(e) => { setMessage(e.target.value) }} className='flex-grow mr-2 rounded-md p-2 bg-neutral-800 text-neutral-200' type="text" />
                <Button style='w-12 bg-violet-500 border-violet-500' handleClick={handleMessage} isLoading={sendMessageQuery.isLoading}><AiOutlineSend size={20} className="text-white" /></Button>
            </div>
            </div>
        </>

    )
}

export default page