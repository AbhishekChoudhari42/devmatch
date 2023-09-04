"use client"

import React from 'react'
import useUserStore from '@/state/store'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import {useState,useEffect,useRef} from 'react'
import {fetchPosts} from '@/app/actions/post.actions'
import { useIntersection } from '@mantine/hooks'
import Post from '@/components/ui/Post'
import { useInfiniteQuery } from '@tanstack/react-query'

const Page = () => {
  const {data:session} = useSession()
  const {user} = useUserStore()
  
  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,error,isLoading} = useInfiniteQuery(
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

  user && console.log("user==",session)
  
  return (
    <div className='w-full text-white '>
      
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
              page?.posts?.map(post => { return <div key={post._id}><Post post={post} user={user}/></div>}) 
                                
            }
            
          </div>
                        
        })):<SkeletonLoader styles="h-[200px]" qty={5} />
      }
      <div ref={ref}>{(isFetchingNextPage) && <SkeletonLoader styles="h-[200px]" qty={5}/>}</div>
      {hasNextPage && (<div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>Loading...</div>)}
    </main>


    </div>
  )
}

export default Page