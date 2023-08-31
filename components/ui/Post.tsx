"use client"

import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import {RiSendPlaneFill,RiUserFollowLine,RiUserFollowFill} from 'react-icons/ri'
import {likePost} from '../../app/actions/post.actions'
import Image from 'next/image'
import {useState} from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { getUser } from '@/app/actions/user.actions'
interface PostTypes{
    _id:string,
    user_id:string,
    username:string,
    createdAt:string,
    updatedAt:string,
    
}

const Post = (props:any) => {
  const {post,user} = props
  const { data: session, status } = useSession() 
  const [likes,setLikes] = useState({initialState : post.likes.length , currentState:post.likes.length})
  const [likeStatus,setLikeStatus] = useState(post.likes.includes(user?.user_id))

  const handlePostLike = async() =>{
      try{
          setLikes({...likes,currentState: likeStatus ? likes.currentState - 1 : likes.currentState + 1})
          setLikeStatus(!likeStatus)
          const {user} = await getUser(String(session?.user?.email))
          const res =  await likePost(post._id,String(user?.user_id))
          if(!res.success){
            alert('post liked')
            setLikes({...likes,currentState:likes.initialState})
          }
        }
        catch(error){
            setLikes({...likes,currentState:likes.initialState})
        }
  }

  return (
    <div className="w-full bg-neutral-950 text-white p-4 rounded-md mb-4 border-neutral-800 border-2">
      
      <div className="flex items-center justify-between mb-4 ">

        <div className="flex items-center ">
          <Image height={28} width={28} className='rounded-md' src={`https://avatars.githubusercontent.com/u/${post.user_id}?v=4`} alt="profile image" />
          <h2 className="ml-4 font-bold text-lg text-neutral-300">{post.user_id}</h2>
        </div>

      </div>

      {/* post content */}
        <p className=" text-white text-md bg-neutral-950 rounded-md mb-4 leading-8">
          {post.content}
        </p>

      <div className="flex items-center gap-8">
        {/* likes */}

        {likeStatus ? <AiFillHeart onClick={handlePostLike} className='text-red-500'/> : 
        <AiOutlineHeart onClick={handlePostLike} className='text-white'/>}
        
        <p className="text-sm text-red-100 hover:text-red-400">{likes.currentState}</p>
        {/* comments */}
        <Link href={`/comment/${post._id}`}>
          <BiCommentDetail/>
        </Link>
        <p className="text-sm text-red-100 hover:text-red-400">{post.comments?.length}</p>
        {/* share */}
        <RiSendPlaneFill className='' />
      </div>
    </div>
  )
}

export default Post