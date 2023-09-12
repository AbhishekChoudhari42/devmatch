"use client"
import { useInfiniteQuery , QueryClient , QueryClientProvider } from "@tanstack/react-query"
import { fetchPosts } from './actions/post.actions'
import Post from "@/components/ui/Post"
import { useIntersection } from "@mantine/hooks"
import { useEffect,useRef,useState } from "react"
import useUserStore from '../state/store'
import SkeletonLoader from "@/components/ui/SkeletonLoader"

export default function Page() {
    
  const {user} = useUserStore()    
  const {data,fetchNextPage,isFetchingNextPage,error,isLoading} = useInfiniteQuery(
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
  

  return (
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
    </main>
  )
}
