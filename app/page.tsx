"use client"
import { useInfiniteQuery , QueryClient , QueryClientProvider } from "@tanstack/react-query"
import { fetchPosts } from './actions/post.actions'
import Post from "@/components/ui/Post"
import { useIntersection } from "@mantine/hooks"
import { useEffect,useRef,useState } from "react"
import { useSession } from "next-auth/react"
import { getUser } from "@/client_api/api"
import useUserStore from '../state/store'
export default function Page() {

  const { data: session, status } = useSession()  
  const {user,setUser} = useUserStore()
  useEffect(() => {
    
    (async function(){
       setUser(await getUser(`${session?.user?.email}`))
    })()
    
  }, [])

  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,error} = useInfiniteQuery(
    ["feed"],
    async ({pageParam = 1}) => { 

        let response =  await fetchPosts(pageParam)
        return response?.posts
    
    },
    {
        getNextPageParam: (_,pages)=>{
            return pages.length + 1
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
            console.log(hasNextPage,"====")
            fetchNextPage()
        }
        
    },[entry])
  
  console.log(data)

  return (
    <main className="w-full bg-neutral-950 text-white">
       {data?.pages?.map((page,index)=>{
                        
          return <div key={index}>
                                
            { 
              page?.map(post => { return <div key={post._id}><Post user={user} post={post}/></div>}) 
                                
            }
            
          </div>
                        
        })
      }
      <div onClick={()=>{fetchNextPage()}} ref={ref}>loading{isFetchingNextPage && '....'}</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
    </main>
  )
}
