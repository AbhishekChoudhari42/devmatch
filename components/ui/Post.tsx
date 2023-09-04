"use client"

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { RiSendPlaneFill, RiUserFollowLine, RiUserFollowFill } from 'react-icons/ri'
import ReactTimeAgo from 'react-time-ago'
import { likePost } from '../../app/actions/post.actions'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { getUser } from '@/app/actions/user.actions'
interface PostTypes {
  _id: string,
  user_id: string,
  username: string,
  createdAt: string,
  updatedAt: string,

}

const Post = (props: any) => {
  const { post, user } = props

  const [likes, setLikes] = useState({ initialState: post.likes.length, currentState: post.likes.length })
  const [likeStatus, setLikeStatus] = useState(post.likes.includes(user?.user_id))

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

  return (
    <div className="w-full bg-neutral-950 text-white p-4 rounded-md mb-4 border-neutral-800 border">

      <div className="flex items-center justify-between mb-4 ">

        <div className="flex items-center ">
          <Image height={28} width={28} className='rounded-md' src={`https://avatars.githubusercontent.com/u/${post.user_id}?v=4`} alt="profile image" />
          <h2 className="ml-4 text-lg font-bold text-white">{post.username}</h2>
        </div>

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
        <p className='text-xs text-neutral-500' >
          <ReactTimeAgo date={post.createdAt} locale={"en-US"} timeStyle="twitter" />
        </p>

      </div>
    </div>
  )
}

export default Post