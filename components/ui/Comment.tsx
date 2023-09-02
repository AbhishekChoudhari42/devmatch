"use client"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { RiSendPlaneFill, RiUserFollowLine, RiUserFollowFill } from 'react-icons/ri'
import { likeComment } from '../../app/actions/comment.actions'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { getUser } from '@/app/actions/user.actions'
interface CommentTypes {
  _id: string,
  user_id: string,
  username: string,
  createdAt: string,
  updatedAt: string,

}

const Comment = (props: any) => {

  const { data: session, status } = useSession()
  const { comment, user } = props
  console.log(user)
  const [likes, setLikes] = useState({ initialState: comment?.likes?.length, currentState: comment?.likes?.length })
  const [likeStatus, setLikeStatus] = useState(comment?.likes?.includes(user?.user_id))
  const handleCommentLike = async () => {
    try {
      setLikes({ ...likes, currentState: likeStatus ? likes.currentState - 1 : likes.currentState + 1 })
      setLikeStatus(!likeStatus)
      const { user } = await getUser(String(session?.user?.email))
      const res = await likeComment(comment._id, user?.user_id)
      if (!res?.success) {
        setLikes({ ...likes, currentState: likes.initialState })
      }
    }
    catch (error) {
      setLikes({ ...likes, currentState: likes.initialState })
    }
  }

  return (
    <div className="w-full bg-neutral-950 text-white p-4 rounded-md mb-4 border-neutral-800 border-2">

      <div className="flex items-center justify-between mb-4 ">

        <div className="flex items-center ">
          <Image height={28} width={28} className='rounded-md' src={`https://avatars.githubusercontent.com/u/${comment.user_id}?v=4`} alt="profile image" />
          <h2 className="ml-4 text-md font-semibold text-white">{comment.username}</h2>
        </div>

      </div>


      {/* comment content */}
      <p className=" text-white text-md bg-neutral-950 rounded-md my-8">
        {comment?.content}
      </p>

      <div className="flex items-center gap-4">
        {/* likes */}
        {likeStatus ? <AiFillHeart size={20} onClick={handleCommentLike} className='text-red-500' /> :
          <AiOutlineHeart size={20} onClick={handleCommentLike} className='text-white' />}
        <p className="text-sm text-red-100 hover:text-red-400">{likes?.currentState}</p>
      </div>
    </div>
  )
}

export default Comment