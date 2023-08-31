"use client"
import {useEffect,useState,useTransition} from 'react'
import { useParams } from 'next/navigation'
import { fetchPostById } from '@/app/actions/post.actions'
import Post from '@/components/ui/Post'
import Button from '@/components/ui/Button'
import {AiOutlineSend} from 'react-icons/ai'
import { addComment,fetchComments } from '@/app/actions/comment.actions'
import { getUser } from '@/client_api/api'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { useQuery , useQueryClient } from '@tanstack/react-query'

import Comment from '@/components/ui/Comment'
const Page = () => {
  const queryClient = useQueryClient()
  
  const [comment,setComment] = useState('')
  
  const [commentList,setCommentList] = useState<any>([])
  const {data:session,status} = useSession()
  
  const params = useParams() 
  
  const postQuery = useQuery(
    ['post'],
    async () => {
          console.log('fetch post')
          const res = await fetchPostById(`${params?.id}`)
          return res?.post
        
      },      
      )


  useEffect(() => {
    (async function(){
        const commentData = await fetchComments(1,`${params.id}`)
        setCommentList(()=>{return commentData?.comments})
    })()
    
  }, [])
  
  const handleComment = async() =>{
    const user = await getUser(String(session?.user?.email))
    await addComment(`${params.id}`,user?.user_id,comment,user?.username)
    const commentData = await fetchComments(1,`${params.id}`)
    queryClient.invalidateQueries({
      queryKey: ['post'],
      exact: true,
    })
    setCommentList(()=>{return commentData?.comments})
  }

  return (
    <div className='w-full flex flex-col'>
        <div className='text-white'>
          <h2 className='font-semibold mb-2'>Comments</h2>
        </div>
        {postQuery.isLoading && <SkeletonLoader qty={1} styles='h-[160px]'/>}

        {postQuery.data && <Post post={postQuery.data}/>}
        
        <div className='flex bg-neutral-800 w-full rounded-md items-center p-2 mb-4'> 
          <input placeholder='comment' value={comment} onChange={(e)=>{setComment(e.target.value)}} className='flex-grow mr-2 rounded-md p-2 bg-neutral-800 text-neutral-200' type="text" />
          <Button style='w-20 bg-violet-500 border-violet-500' handleClick={handleComment} isLoading={false}><AiOutlineSend size={20} className="text-white" /></Button>
        </div>

        <div className='text-white'>
          {postQuery.isLoading && <SkeletonLoader qty={5} styles='h-[160px]'/>}
          {commentList && commentList.map((comment:any)=>{
            
            // return <div key={comment?._id}>{comment?.content}</div>
            return <div key={comment?._id}><Comment comment={comment} /></div>
          })}
        </div>
    </div>
  )
}

export default Page