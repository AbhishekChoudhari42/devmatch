import {navElements} from '../../constants/constants' 
import Link from 'next/link'


const Bottombar = () => {
    
    return (
  
        <div className="sm:hidden fixed bottom-0 w-full h-[50px] bg-neutral-950 flex justify-between items-center p-2 px-4">
             {
                navElements.map((link,index)=>{
                    return <Link key={index} href={link.route} className='text-white p-2 hover:bg-neutral-900 rounded-md'>
                                <link.icon/>
                            </Link>
                })
            }
        </div>
    )
}

export default Bottombar