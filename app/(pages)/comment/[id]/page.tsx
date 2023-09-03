"use client"
import { useEffect, useState, useRef } from 'react'
import { useIntersection } from "@mantine/hooks"
import { useQuery, useQueryClient, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useUserStore from '@/state/store'

import { getUser } from '@/app/actions/user.actions'
import { fetchPostById } from '@/app/actions/post.actions'
import { addComment, fetchComments , updateCommentById } from '@/app/actions/comment.actions'

import Post from '@/components/ui/Post'
import Comment from '@/components/ui/Comment'
import Button from '@/components/ui/Button'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { AiOutlineSend } from 'react-icons/ai'
import Modal from '@/components/ui/Modal'

const Page = () => {
  const queryClient = useQueryClient()
  const { user } = useUserStore()
  const [comment, setComment] = useState('')
  console.log(user)
  const [commentList, setCommentList] = useState<any>([])
  const { data: session, status } = useSession()

  const params = useParams()

  const postQuery = useQuery(
    ['post'],
    async () => {
      console.log('fetch post')
      const res = await fetchPostById(String(params?.id))
      return res?.post
    },
  )

  const addCommentQuery = useMutation({
    mutationFn: async () => {
      const { user } = await getUser(String(session?.user?.email))
      const res = await addComment(String(params?.id), user?.user_id, comment, user?.username)
      return res?.success
    },
    onSuccess: () => {
      setComment('')
      queryClient.invalidateQueries({ queryKey: ['comment'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
    }
  })

  const handleComment = async () => {
    addCommentQuery.mutate()
  }

  const fetchCommentsQuery = useInfiniteQuery({
    queryKey: ['comment'],
    queryFn: async ({ pageParam = 1 }) => {
      console.log("fetch comment")
      const response = await fetchComments(Number(pageParam), String(params?.id))
      return { comments: response?.comments, isNextPage: response?.isNextPage }

    },
    getNextPageParam: (_, pages) => {
      return pages[pages.length - 1]?.isNextPage ? pages.length + 1 : undefined
    },
    initialData: {
      pages: [],
      pageParams: [1]
    },
    cacheTime: 0
  }
  )

  const lastPostRef = useRef<HTMLDivElement | null>(null)

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchCommentsQuery.fetchNextPage()
    }

  }, [entry])

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['comment'] });
  }, [])

  const [editModal,setEditModal] = useState({status:false,commentId:'',content:''})
  const [deleteModal,setDeleteModal] = useState({status:false,commentId:''})

  const updateCommentQuery = useMutation({
    mutationFn: async () => {
      const { user } = await getUser(String(session?.user?.email))
      const res = await updateCommentById(String(editModal.commentId), editModal.content, user?.user_id)
      return res?.success
    },
    onSuccess: () => {
      setComment('')
      setEditModal({status:false,commentId:'',content:''})
      fetchCommentsQuery.refetch()
    }
  })



  return (
    <div className='w-full flex flex-col'>

      {editModal.status && <Modal>
        
        <p className="font-semibold text-white" >Edit Post</p>
        <input className='p-2 w-full rounded-md bg-neutral-800 text-white my-8' placeholder='comment' value={editModal.content} onChange={(e)=>setEditModal({...editModal,content:e.target.value})} type="text" />
        <div className='flex w-full gap-4' >
          <Button 
            style={'bg-neutral-800 w-full border-transparent text-sm'} 
            isLoading={false} 
            handleClick={() =>{
              setEditModal({status:false,commentId:'',content:''})
            }}>
            Cancel
          </Button>

          <Button 
            style={'bg-blue-500 w-full border-transparent text-sm'} 
            isLoading={updateCommentQuery.isLoading} 
            handleClick={()=>{
              updateCommentQuery.mutate()  
            }}>
            Save Changes
            </Button>
        </div>

      </Modal>}
      
      
      {(!postQuery.isLoading && postQuery.data && user) ?
        <Post post={postQuery.data} user={user} />
        : <SkeletonLoader qty={1} styles='h-[160px]' />
      }

      <div className='flex bg-neutral-800 w-full rounded-md items-center p-2 mb-4'>
        <input placeholder='comment' value={comment} onChange={(e) => { setComment(e.target.value) }} className='flex-grow mr-2 rounded-md p-2 bg-neutral-800 text-neutral-200' type="text" />
        <Button style='w-20 bg-violet-500 border-violet-500' handleClick={handleComment} isLoading={addCommentQuery.isLoading}><AiOutlineSend size={20} className="text-white" /></Button>
      </div>

      <div className='text-white'>
        {(!fetchCommentsQuery.isLoading && user) ? (fetchCommentsQuery.data?.pages?.map((page, index) => {
          return <div key={index}>
            {
              page?.comments?.map(comment => { return <div key={comment?._id}><Comment comment={comment} user={user} setEditModal={setEditModal} editModal={editModal} /></div> })
            }
          </div>
        })) : <SkeletonLoader styles="h-[200px]" qty={5} />
        }
        <div ref={ref}>{(fetchCommentsQuery.isFetchingNextPage && !fetchCommentsQuery.data) && <SkeletonLoader styles="h-[200px]" qty={5} />}</div>
      </div>
    </div>
  )
}

export default Page