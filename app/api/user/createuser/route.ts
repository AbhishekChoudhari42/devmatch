import connectDB from '@/db/mongodb'
import User from '@/db/models/User'

import { NextRequest , NextResponse} from 'next/server'

export async function POST(req : NextRequest) {

    
    const res = NextResponse
    
    try{
        const {username} = await req.json()
        const user = {username}
        connectDB()

        await User.create(user);
        return res.json({message:"success",data:user})
    }
    catch(error){
        console.log(error)
        return res.json({message:"error"})
    }
  
    
}