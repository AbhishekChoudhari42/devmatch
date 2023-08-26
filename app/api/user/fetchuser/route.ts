import connectDB from '@/db/mongodb'
import User from '@/db/models/User'

import { NextRequest , NextResponse} from 'next/server'

export async function GET(req : NextRequest) {

    
    const res = NextResponse
    
    try{

        const email = req.nextUrl.searchParams.get("email")
         
        connectDB()
        let currentUser = await User.findOne({email:email})
        console.log(currentUser)
        console.log(email)
        return res.json({message:"success",user:currentUser})
    
    }
    catch(error){
        return res.json({message:"error"})
    }
  
    
}