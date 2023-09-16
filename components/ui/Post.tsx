"use client"

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { RiSendPlaneFill, RiUserFollowLine, RiUserFollowFill } from 'react-icons/ri'
import ReactTimeAgo from 'react-time-ago'
import { BiEditAlt } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'

import { likePost } from '../../app/actions/post.actions'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { followUser, getUser } from '@/app/actions/user.actions'
import useUserStore from '@/state/store'

import { useMutation } from '@tanstack/react-query'
import Button from './Button'
interface PostTypes {
  _id: string,
  user_id: string,
  username: string,
  createdAt: string,
  updatedAt: string,

}

const Post = (props: any) => {
  const { post, user, profilePage, setEditModal, setDeleteModal } = props
  
  const {setUser} = useUserStore()  
  
  const [likes, setLikes] = useState({ initialState: post.likes.length, currentState: post.likes.length })
  const [likeStatus, setLikeStatus] = useState(post.likes.includes(user?.user_id))
  
  const followingArray = user.following.map((element:string[])=>{return element[0]})
  
  const [followed, setFollowed] = useState<boolean>(followingArray.includes(post.user_id))
  
  const handlePostLike = async () => {
    try {
      setLikes({ ...likes, currentState: likeStatus ? likes.currentState - 1 : likes.currentState + 1 })
      setLikeStatus(!likeStatus)
      const res = await likePost(post._id, String(user?.user_id))
      if (!res.success) {
        alert('post liked')
        setLikes({ ...likes, currentState: likes.initialState })
      }
    }
    catch (error) {
      setLikes({ ...likes, currentState: likes.initialState })
    }
  }

  const followUserQuery = useMutation({
    mutationFn: async () =>{
      try{

        setFollowed(!followed)

        console.log("payload === ",user?.user_id,post?.user_id)
        const res = await followUser(user?.user_id,post?.user_id)
        
        console.log(res,"===res")
        
        return res.success 
        
      }catch(error){
        
        setFollowed(followed)
        return false
      }
    },
    onSuccess:async () => {
      const {user:newUser} = await getUser(String(user?.email))
      setUser(newUser)
      console.log('success')
    }})

  return (
    <div className="w-full bg-neutral-950 text-white p-4 rounded-md mb-4 border-neutral-800 border">

      <div className="flex items-center justify-between mb-4 ">

        <div className="flex items-center ">
          <Image height={28} width={28} className='rounded-md' src={`https://avatars.githubusercontent.com/u/${post.user_id}?v=4`} alt="profile image" />
          <h2 className="ml-4 text-lg font-bold text-white">{post.username}</h2>
        </div>
        {!(user.user_id == post.user_id) && (<div onClick={()=>{followUserQuery.mutate()}} className=''>
        {
          followed ?
          <RiUserFollowFill className='text-green-500' size={20} />:
          <RiUserFollowLine size={20} />
        }
        </div>)
        }
        {/* <div className=''><RiUserFollowLine size={20} /></div> */}


      </div>

      {/* post content */}
      <p className=" text-white text-md bg-neutral-950 rounded-md my-8">
        {post.content}
      </p>



      <div className='w-full flex justify-between '>

        <div className="flex items-center gap-4">
          {/* likes */}

          <div className='rounded-full hover:text-red-400 transit cursor-pointer'>

            {likeStatus ? <AiFillHeart size={20} onClick={handlePostLike} className='text-red-500' /> :

              <AiOutlineHeart size={20} onClick={handlePostLike} />
            }

          </div>

          <p className="text-sm text-white hover:text-red-400 mr-4">{likes.currentState}</p>
          {/* comments */}
          <Link href={`/comment/${post._id}`}>
            <div className='rounded-full hover:text-blue-400 transit'>
              <BiCommentDetail size={20} />
            </div>
          </Link>
          <p className="text-sm text-red-100 hover:text-red-400 mr-4">{post.comments?.length}</p>
          {/* share */}
          <RiSendPlaneFill size={20} className='' />
        </div>

        {((post.user_id === user.user_id) && profilePage) ?
          (<div className='flex gap-4'>
            <div className={'bg-neutral-950 hover:bg-neutral-800 border-none p-1 rounded-md cursor-pointer transit'} onClick={() => { setEditModal({ status: true, postId: post?._id, content: post?.content }) }}><BiEditAlt size={20} /></div>
            <div className={'bg-neutral-950 hover:bg-neutral-800 border-none p-1 rounded-md cursor-pointer hover:text-red-500 hover:bg-red-950/50 transit'} onClick={() => { setDeleteModal({ status: true, postId: post?._id }) }}><MdDeleteOutline size={20} /></div>
          </div>) : (<p className='text-sm text-neutral-500' ><ReactTimeAgo date={post.createdAt} locale={"en-US"} timeStyle="twitter" /></p>)
        }
      </div>
    </div>
  )
}

export default Post