"use client"
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { createPost } from "@/app/actions/post.actions"
import { getUser } from '@/app/actions/user.actions'
import { useTransition } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
const page = () => {

    const { data: session, status } = useSession()
    const router = useRouter()
    const path = usePathname()
    
    const [content,setContent] = useState("")
    const CONTENT_LIMIT = 300
    const userEmail = String(session?.user?.email)
    
    const [isPending,startTransition] = useTransition()
    
    const handleSubmit = async (e:any) => {
        e.preventDefault()

        try{

            if(content == "" || content == undefined || content == null || content?.length > CONTENT_LIMIT){
                
                throw new Error("Post content should not be empty or more than "+CONTENT_LIMIT+"characters.")
            
            }
        
            const {user} = await getUser(userEmail)
            
            console.log("user===",user)
            const user_id = String(user?.user_id)
            const username = String(user?.username)

            startTransition(()=>createPost({content,user_id,username,path}))
            setContent('')

            router.push('/')
        
        }catch(error){

            return {message:error}
    
        }
    }

    return (

    <div className="text-white">
        <form className='w-full h-full p-4 border-neutral-800 border-2 rounded-md'>
            <textarea  
                value={content} 
                placeholder="What's on your mind ?" 
                onChange={(e)=>{setContent(e.target.value);console.log(content)}} 
                name="content" 
                className={`text-neutral-100 bg-neutral-950 w-full h-[200px] max-h-[300px] border-neutral-800 border-2 p-4 rounded-md ${content?.length > CONTENT_LIMIT && 'focus:border-red-500'}` }
            />
            {/*  */}
            <p className={`my-4 text-xs ${content?.length > CONTENT_LIMIT ? 'text-red-500':'text-neutral-200' }`}>{content?.length}/{CONTENT_LIMIT} {content?.length > CONTENT_LIMIT && "( Content should be less than 300 characters )"}</p>
            <Button style='bg-violet-500 border-violet-500 w-full' handleClick={handleSubmit} isLoading={isPending}>Create</Button>

        </form>
    </div>
    )
}

export default page