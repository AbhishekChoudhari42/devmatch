import connectDB from '@/db/mongodb'
import User from '@/db/models/User'

import { NextRequest , NextResponse} from 'next/server'

export async function POST(req : NextRequest) {

    
    const res = NextResponse
    
    try{
        const {user} = await req.json()
        
        connectDB()
        let currentUser = await User.findOne({user_id:user.user_id})
        if(currentUser?._id){

            await User.findByIdAndUpdate({_id:currentUser?._id},user);

        } 
        else{
            
            await User.create(user);
        }
        return res.json({message:"success",data:user})
    }
    catch(error){
        return res.json({message:"error"})
    }
  
    
}