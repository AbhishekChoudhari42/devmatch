"use client"

import {FcLike} from 'react-icons/fc'
import {BiCommentDetail} from 'react-icons/bi'
import {RiSendPlaneFill,RiUserFollowLine,RiUserFollowFill} from 'react-icons/ri'
import {likePost} from '../../app/actions/post.actions'
import Image from 'next/image'
import {useState} from 'react'
import useUserStore from '@/state/store'
import { useSession } from "next-auth/react"

import { getUser } from '@/client_api/api'
interface PostTypes{
    _id:string,
    user_id:string,
    username:string,
    createdAt:string,
    updatedAt:string,
    
}

const Post = (props:any) => {
  
  const {post} = props
  
  console.log(post)
  const user_id = '80809554'
  const { data: session, status } = useSession() 
  const [likes,setLikes] = useState({initialState : post.likes.length , currentState:post.likes.length})
  const [likeStatus,setLikeStatus] = useState(post.likes.includes(user_id))
  
  const handlePostLike = async() =>{
    console.log(likeStatus?'like':'unlike')
      try{
          setLikes({...likes,currentState: likeStatus ? likes.currentState - 1 : likes.currentState + 1})
          setLikeStatus(!likeStatus)
          const user = await getUser(`${session?.user?.email}`)
          const res =  await likePost(post._id,user?.user_id)
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
      
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center ">
          <Image height={28} width={28} className='rounded-md' src={`https://avatars.githubusercontent.com/u/${post.user_id}?v=4`} alt="profile image" />
          <h2 className="ml-4 font-bold text-lg text-neutral-300">{post.user_id}</h2>
        </div>

      </div>

      {/* post content */}
        <p className=" text-white text-md bg-neutral-950 rounded-md mb-4 leading-8">
          {post.content}
        </p>

      <div className="flex items-center ">
        {/* likes */}
        <FcLike color="white" onClick={handlePostLike} className={`mb-[3px] filter-greyscale-50 ${likeStatus?'bg-red-500 rounded-full p-2':'bg-green'}`}/>
        <p className="text-sm text-red-100 hover:text-red-400 ml-4">{likes.currentState}</p>
        {/* comments */}
        <BiCommentDetail className='ml-8' />
        <p className="text-sm text-red-100 hover:text-red-400 ml-4">141{/* {data.likes?.length} */}</p>
        {/* share */}
        <RiSendPlaneFill className='ml-8' />
      </div>
    </div>
  )
}

export default Post