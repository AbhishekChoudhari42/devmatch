import connectDB from '@/db/mongodb'
import Post from '@/db/models/Post'

import { NextRequest , NextResponse} from 'next/server'

export async function GET(req : NextRequest) {

    
    const res = NextResponse

    const page = req.nextUrl.searchParams.get("page")?.toString()
    

    const limit = 10
    const skip = (parseInt(`${page || 1}`) - 1) * limit
        
    const path = '/'

    try{

            const posts = await Post.find({}).skip(skip).limit(limit).sort({ createdAt: "desc" });
                            
            return res.json({message:'success',posts:posts})
    
    }
    catch(error){
        return res.json({message:"error"})
    }

}