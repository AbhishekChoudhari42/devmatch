"use client"
import {useSession} from 'next-auth/react'
import { usePathname } from 'next/navigation'
import {useState} from 'react'
import { createPost } from "@/app/actions/post.actions"
import { getUser } from '@/client_api/api'
import { useTransition } from 'react'
const page = () => {

    const { data: session, status } = useSession()
    const path = usePathname()
    const [content,setContent] = useState("")
    const userEmail = `${session?.user?.email}`
    const [isPending,startTransition] = useTransition()
    console.log(session)
    const handleSubmit = async (e:any) => {
        e.preventDefault()

        try{

            if(content == "" || content == undefined || content == null){
                
                throw new Error("post content cannot empty")
            
            }
        
            const {user_id,username,_id} = await getUser(userEmail)
            
            startTransition(()=>createPost({content,_id,user_id,username,path}))
        
        }catch(error){
            console.log(error)
        }
    }
    // handlesubmit

    return (
    <div className="text-white">
        <form>
            <textarea value={content} placeholder='post' onChange={(e)=>{setContent(e.target.value)}} name="content" className='text-black ' />
            <button onClick={handleSubmit}>submit</button>
        </form>
    </div>
    )
}

export default page