"use client"

import React from 'react'
import useUserStore from '@/state/store'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import {useState,useEffect,useRef} from 'react'
import {fetchPosts,updatePostById,deletePostById} from '@/app/actions/post.actions'
import { useIntersection } from '@mantine/hooks'
import Post from '@/components/ui/Post'
import { getUser } from '@/app/actions/user.actions'
import { useInfiniteQuery , useMutation } from '@tanstack/react-query'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import {AnimatePresence} from 'framer-motion'
const Page = () => {
  const {data:session} = useSession()
  const {user} = useUserStore()
  
  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,error,isLoading,refetch} = useInfiniteQuery(
    ["feed"],
    async ({pageParam = 1}) => { 
      
        const response =  await fetchPosts(pageParam)
        return {posts: response?.posts,isNextPage: response?.isNextPage}
    
    },
    {
        getNextPageParam: (_,pages)=>{         
            return pages[pages.length - 1]?.isNextPage ? pages.length + 1 : undefined
        },
        initialData:{
            pages: [],
            pageParams:[1]
        }
    }
  )
 
  const lastPostRef = useRef<HTMLDivElement|null>(null)

    const {ref,entry} = useIntersection({
        root : lastPostRef.current,
        threshold : 1
    
    })

    useEffect(()=>{
      
        if(entry?.isIntersecting){
            fetchNextPage()
        }
        
    },[entry])

    const [editModal, setEditModal] = useState({ status: false, postId: '', content: '' })
    const [deleteModal, setDeleteModal] = useState({ status: false, postId: '' })
    // updatePostById,deletePostById
    //update comment 
    const updatePostQuery = useMutation({
      mutationFn: async () => {
        const { user } = await getUser(String(session?.user?.email))
        const res = await updatePostById(String(editModal.postId), editModal.content, user?.user_id)
        return res?.success
      },
      onSuccess: () => {
        setEditModal({ status: false, postId: '', content: '' })
        // from infinite query
        refetch()
      }
    })
    //delete comment 
    const deletePostQuery = useMutation({
      mutationFn: async () => {
        const { user } = await getUser(String(session?.user?.email))
       
        const res = await deletePostById(String(deleteModal?.postId), user?.user_id)
        return res?.success
      },
      onSuccess: () => {
        setDeleteModal({ status: false, postId: ''})
        refetch()
      }
    })
  
  return (
    <div className='w-full text-white '>
      
      <AnimatePresence>

{editModal.status && <Modal>

  <p className="font-semibold text-white" >Edit Comment</p>
  <input className='p-2 w-full rounded-md bg-neutral-800 text-white my-8' placeholder='comment' value={editModal.content} onChange={(e) => setEditModal({ ...editModal, content: e.target.value })} type="text" />
  <div className='flex w-full gap-4' >
    <Button
      style={'bg-neutral-800 w-full border-transparent text-sm'}
      isLoading={false}
      handleClick={() => {
        setEditModal({ status: false, postId: '', content: '' })
      }}>
      Cancel
    </Button>

    <Button
      style={'bg-blue-500 w-full border-transparent text-sm'}
      isLoading={updatePostQuery.isLoading}
      handleClick={() => {
        updatePostQuery.mutate()
      }}>
      Save Changes
    </Button>
  </div>

</Modal>}

{/* delete modal */}

{deleteModal.status && <Modal>

  <p className="font-semibold text-white mb-4" >Do you want to delete this post?</p>
  <div className='flex w-full gap-4' >
    <Button
      style={'bg-neutral-800 w-full border-transparent text-sm'}
      isLoading={false}
      handleClick={() => {
        setDeleteModal({ status: false, postId: ''})
      }}>
      Cancel
    </Button>

    <Button
      style={'bg-red-500 w-full border-transparent text-sm'}
      isLoading={deletePostQuery.isLoading}
      handleClick={() => {
        deletePostQuery.mutate()
      }}>
      Delete
    </Button>
  </div>

</Modal>}

</AnimatePresence>




      {user ? 
      (<div className='w-full border border-neutral-800 rounded-md p-4 flex gap-4'>
        <Image width={72} height={72} src={String(session?.user?.image)} alt="profile picture" className='rounded-md h-16 w-16' />
        <div>
          <h2 className='font-semibold text-lg mb-1'>{user?.username}</h2>
          <p className='text-sm text-neutral-500 '>{user?.email}</p>
        </div>
      </div>):(
        <SkeletonLoader styles="h-[300px]" qty={1} />
        )}
      <p className='text-xs text-neutral-500 mt-4'>Bio : {user?.bio}</p>
      <p className='text-xs text-neutral-500 mt-4'>Location : {user?.location}</p>
      <h2 className='my-4 font-semibold'>Posts</h2>
      <main className="w-full bg-neutral-950 text-white">       
       {!isLoading && user ? (data?.pages?.map((page,index)=>{
          return <div key={index}>
                                
            { 
              page?.posts?.map(post => { return <div key={post._id}><Post post={post} user={user} profilePage={true} setEditModal={setEditModal} setDeleteModal={setDeleteModal} /></div>}) 
                                
            }
            
          </div>
                        
        })):<SkeletonLoader styles="h-[150px]" qty={5} />
      }
      <div ref={ref}>{(isFetchingNextPage) && <SkeletonLoader styles="h-[200px]" qty={5}/>}</div>
      {hasNextPage && (<div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>Loading...</div>)}
    </main>


    </div>
  )
}

export default Page