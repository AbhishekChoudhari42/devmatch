"use client"
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Topbar = () => {
  const { data: session, status } = useSession()

  const path = usePathname()
  return (
    <nav className="flex top-0 justify-between items-center w-full bg-black h-14 p-2 px-4 absolute z-10">
        <Link href="/" className='flex'>
          <Image height={32} width={32} alt="profile picture" src="/logo.webp" className='rounded-md' />
          <p className="text-white font-bold text-xl pl-4" >Devmatch</p>

        </Link>

          <Link href="/profile">
              <Image height={32} width={32} alt="profile picture" src={session?.user?.image}  className={`rounded-md hover ${path == '/profile' && 'border-2 border-white'}`}/>
          </Link>
    </nav>
  )
}

export default Topbar