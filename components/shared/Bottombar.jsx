"use client"
import {navElements} from '../../constants/constants' 
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Bottombar = () => {
    const pathname = usePathname()
    return (

        <div className="sm:hidden fixed bottom-0 w-full h-14  bg-neutral-950 flex justify-between items-center p-2 px-4 border-t-[1px] border-neutral-800">
             {
                navElements.map((link,index)=>{
                    const isActive = pathname.includes(link.route) && (link.route.length > 0) && pathname === link.route

                    return <Link key={index} href={ {pathname:link.route}} className={`text-white text-md p-2 rounded-md ${isActive ? 'bg-violet-600 hover:bg-violet-600' : 'bg-neutral-950 hover:bg-neutral-800'}`}>
                            
                                <link.icon size={24}/>
                            
                            </Link>
                })
            }
        </div>
    )
}

export default Bottombar