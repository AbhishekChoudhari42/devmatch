"use client"

import {FcLike} from 'react-icons/fc'
import {BiCommentDetail} from 'react-icons/bi'
import {RiSendPlaneFill,RiUserFollowLine,RiUserFollowFill} from 'react-icons/ri'
import { useState } from 'react'
import userImage from '../../assets/user.jpg'
import { likePost } from '../../app/actions/post.actions'
import Image from 'next/image'
import { useMutation , useQueryClient} from '@tanstack/react-query'

interface PostTypes{
    _id:string,
    user_id:string,
    username:string,
    createdAt:string,
    updatedAt:string,
    
}

const Post = (data:any) => {

  const queryClient = useQueryClient()

  const [isLiked,setIsLiked] = useState(false)

  const handlePostLike = async() =>{
        console.log('likes')
        return await likePost(data.data._id,data.data.user_id)
  }


  const likePostMutation = useMutation({
    // mutationFn:(status,postID) => likePost(status,postID),
    onSuccess: ()=>{
      console.log("liked")
      queryClient.invalidateQueries(["feed"])
    }
  })

  const [follow,setFollow] = useState(true)

  return (
    <div className="w-full bg-neutral-950 text-white p-4 rounded-md mb-4 border-neutral-800 border-2">
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center ">
 
          {/* <img className='w-8 h-8 rounded-md' src={userImage} alt="" /> */}
           <Image height={20} width={20} src={"https://avatars.githubusercontent.com/u/80809554?v=4"} alt="profile image" />
          <h2 className="ml-4 font-bold text-lg">
              {/* {data.user} */}
          </h2>

        </div>

          {follow ? <RiUserFollowLine onClick={()=>{setFollow(false)}} size={20}/> : <RiUserFollowFill onClick={()=>{setFollow(true)}} size={20}/>}
      </div>

      <p className=" text-white text-md bg-neutral-950 rounded-md mb-4 leading-8">
         {data.data.content}
         {console.log("FDFD",data.data.content)}
      </p>
      <div className="flex items-center ">
        
        {/* <FcLike onClick={()=>{likePostMutation.mutate("liked",data._id)}} color='green' className=' mb-[2px]'/> */}
        <FcLike onClick={handlePostLike} color='green' className='mb-[10px]'/>
       
        <p className="text-sm text-red-100 hover:text-red-400 ml-4">
          {/* {data.likes?.length} */}
          141
        </p>

        <BiCommentDetail className='ml-8' />

        <p className="text-sm text-red-100 hover:text-red-400 ml-4">
            141
          {/* {data.likes?.length} */}
        </p>

        <RiSendPlaneFill className='ml-8' />
      </div>
    </div>
  )
}

export default Post