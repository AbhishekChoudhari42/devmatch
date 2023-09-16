"use client"
import useUserStore from '@/state/store'
import React from 'react'

const Message = ({content,sender}:{content:string,sender:string}) => {
  
    const {user} = useUserStore()

    return (
    <div className={`w-full mb-4 flex ${sender == user?.user_id ? 'justify-end':'justify-start'}`}>
        <div className={`max-w-2/3 p-2 rounded-md ${sender == user?.user_id ? 'bg-violet-500':'bg-neutral-800'}`}>
            {content}
        </div>
    </div>
  )
}

export default Message