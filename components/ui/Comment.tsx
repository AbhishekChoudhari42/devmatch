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
import Modal from './Modal'
import Button from './Button'
import {BiEditAlt} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'

interface CommentTypes {
  _id: string,
  user_id: string,
  username: string,
  createdAt: string,
  updatedAt: string,

}

const Comment = (props: any) => {

  const { data: session, status } = useSession()
  const { comment, user ,setEditModal ,editModal } = props
  
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

      <div className="flex items-center justify-between">
        <div className='flex gap-4'>

        {likeStatus ? <AiFillHeart size={20} onClick={handleCommentLike} className='text-red-500' /> :
          <AiOutlineHeart size={20} onClick={handleCommentLike} className='text-white' />}
        <p className="text-sm text-red-100 hover:text-red-400">{likes?.currentState}</p>
        </div>
      
        {/* {(comment.user_id === user.user_id) && <Button style={'w-10 bg-neutral-950 hover:bg-neutral-800 border-none transit'} isLoading={false} handleClick={()=>{setEditModal(true)}}><BiEditAlt/></Button>} */}
        <div className='flex gap-4'>
          {(comment.user_id === user.user_id) && <div className={'bg-neutral-950 hover:bg-neutral-800 border-none p-1 rounded-md cursor-pointer transit'} onClick={()=>{setEditModal({status:true,commentId:comment?._id,content:comment?.content})}}><BiEditAlt size={20} /></div>}
          {(comment.user_id === user.user_id) && <div className={'bg-neutral-950 hover:bg-neutral-800 border-none p-1 rounded-md cursor-pointer hover:text-red-500 hover:bg-red-950/50 transit'} onClick={()=>{setEditModal(true)}}><MdDeleteOutline size={20} /></div>}
        </div>
      </div>
    </div>
  )
}

export default Comment