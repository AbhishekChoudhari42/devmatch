"use client"
import { useInfiniteQuery , QueryClient , QueryClientProvider } from "@tanstack/react-query"
import { fetchPosts } from './actions/post.actions'
import Post from "@/components/ui/Post"
import { useIntersection } from "@mantine/hooks"
import { useEffect,useRef,useState } from "react"
import { useSession } from "next-auth/react"
import { getUser } from "@/client_api/api"
import useUserStore from '../state/store'
import SkeletonLoader from "@/components/ui/SkeletonLoader"
export default function Page() {

  const { data: session, status } = useSession()  
  const {user,setUser} = useUserStore()
  useEffect(() => {
    
    (async function(){
       setUser(await getUser(`${session?.user?.email}`))
    })()
    
  }, [])
  const [pageEnd,setPageEnd] = useState(false)
  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,error,isLoading} = useInfiniteQuery(
    ["feed"],
    async ({pageParam = 1}) => { 

        let response =  await fetchPosts(pageParam)
        console.log(response?.isNextPage)
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
            console.log(hasNextPage,"====")
            fetchNextPage()
        }
        
    },[entry])
  
  console.log(data)

  return (
    <main className="w-full bg-neutral-950 text-white">       
       {!isLoading ? (data?.pages?.map((page,index)=>{
                console.log(page)        
          return <div key={index}>
                                
            { 
              page?.posts?.map(post => { return <div key={post._id}><Post post={post}/></div>}) 
                                
            }
            
          </div>
                        
        })):<SkeletonLoader styles="h-[200px]" qty={5} />
      }
      <div ref={ref}>{(isFetchingNextPage) && <SkeletonLoader styles="h-[200px]" qty={5}/>}</div>
      {hasNextPage && (<div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>Loading...</div>)}
    </main>
  )
}
