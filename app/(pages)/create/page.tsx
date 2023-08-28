"use client"
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { createPost } from "@/app/actions/post.actions"
import { getUser } from '@/client_api/api'
import { useTransition } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const page = () => {

    const { data: session, status } = useSession()
    
    const path = usePathname()

    const [content,setContent] = useState("")
    const userEmail = `${session?.user?.email}`
    
    const [isPending,startTransition] = useTransition()
    
    const handleSubmit = async (e:any) => {
        e.preventDefault()

        try{

            if(content == "" || content == undefined || content == null){
                
                throw new Error("post content cannot empty")
            
            }
        
            const {user_id,username,_id} = await getUser(userEmail)
            
            startTransition(()=>createPost({content,_id,user_id,username,path}))

            setContent('')
        
        }catch(error){

    
        }
    }

    return (
    <div className="text-white">
        <form className='w-full h-full p-4 border-neutral-800 border-2 rounded-md'>
            <textarea  
                value={content} 
                placeholder="What's on your mind ?" 
                onChange={(e)=>{setContent(e.target.value)}} 
                name="content" 

                className='text-neutral-100 bg-neutral-950 w-full h-[200px] border-neutral-800 border-2 p-4 rounded-md mb-4' 
            />
            {/*  */}

            <button 
                onClick={handleSubmit}
                className='text-green-900 bg-green-500 p-2 w-full rounded-md'
            >
            submit{isPending && <AiOutlineLoading3Quarters color="red" className="animate-spin" />}
            </button>
        </form>
    </div>
    )
}

export default page