"use client"

import Link from 'next/link'
import {useSession} from 'next-auth/react'
import {navElements} from '../../constants/constants' 
import {TbLogout} from 'react-icons/tb'
import { usePathname } from 'next/navigation'

const SideNavigation = () => {

    const pathname = usePathname()
    const { data: session, status } = useSession()

   
    return (
    
    <div className='relative max-sm:hidden flex-grow h-full bg-neutral-950 p-4 max-md:max-w-fit max-w-[200px] w-full border-r border-neutral-800'>
        {
            navElements.map((link,index)=>{
                    
                    const isActive = pathname.includes(link.route) && (link.route.length > 0) && pathname === link.route

                    return (<Link key={index} href={{pathname:link.route}} className={`transit flex items-center text-white  w-full  p-2 px-4 max-md:px-2 max-md:ml-0 block rounded-md mb-4 ${isActive ? 'bg-violet-600 hover:bg-violet-600' : 'bg-neutral-950 hover:bg-neutral-800'}`}>
                                <link.icon size={20}/>
                                <p className='ml-2 text-sm  max-md:hidden max-md:p-0'>{link.label} </p>   
                            </Link>)
            })
        }
        
        <Link href="/api/auth/signout" className='transit flex item-center absolute bg-neutral-950 text-white text-sm hover:bg-red-600 p-2 px-4 max-md:px-2 block rounded-md bottom-4'>
            <TbLogout size={20}/> 
            <p className='ml-2 text-sm max-md:hidden max-md:p-0 max-md:ml-0 '>Logout</p> 
        </Link>
               
        
     </div>
  
  )
}

export default SideNavigation