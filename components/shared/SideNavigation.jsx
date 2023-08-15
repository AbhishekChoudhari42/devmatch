"use client"

import Link from 'next/link'
import {useSession} from 'next-auth/react'
import {navElements} from '../../constants/constants' 
import {TbLogout} from 'react-icons/tb'

const SideNavigation = () => {
    
    const { data: session, status } = useSession()
    console.log(status)
    return (
    
    <div className='max-sm:hidden flex-grow h-screen bg-neutral-950 py-14 px-4 relative  max-md:max-w-fit max-w-[200px] '>
        {
            navElements.map((link,index)=>{
                return <Link key={index} href={link.route} className='flex items-center bg-neutral-950 text-white  w-full hover:bg-neutral-800 p-2 px-4 max-md:px-2 max-md:ml-0 block rounded-md mb-4'>
                            {/* {link.icon} */}
                            <link.icon/>
                            <p className='ml-2 text-sm  max-md:hidden max-md:p-0'>{link.label} </p>   
                        </Link>
            })
        }

        <Link href="/api/auth/signout" className='flex item-center absolute bg-neutral-950 text-white text-sm hover:bg-red-600 p-2 px-4 max-md:px-2 block rounded-md bottom-4'>
            <TbLogout size={14} className='mt-[5px] '/> 
            <p className='ml-2 text-sm max-md:hidden max-md:p-0 max-md:ml-0 '>Logout</p> 
        </Link>
               
        
     </div>
  
  )
}

export default SideNavigation