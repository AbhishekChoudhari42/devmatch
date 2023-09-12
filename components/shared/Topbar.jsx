"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useUserStore from '@/state/store'
import { getUser } from '@/app/actions/user.actions'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
const Topbar = () => {

  const { data: session, status } = useSession()


  const path = usePathname()
  const { user, setUser } = useUserStore()
  useEffect(() => {
    const getCurrentUser = async () => {
      if (session) {
        const {user} = await getUser(String(session?.user?.email))
        setUser(user)
        console.log(user)
      }

    }
    getCurrentUser()

  }, [session])

  return (
    <nav className="flex max-w-[1300px] top-0 justify-between items-center w-full bg-neutral-950 border-b border-neutral-800 h-14 p-2 px-4 fixed z-10 ">

      <Link href="/" className='flex'>
        <Image height={32} width={32} alt="logo" src="/logo.webp" className='rounded-md ' />
        <p className="text-white font-bold text-xl pl-4" >Devmatch</p>
      </Link>

      <Link href="/profile">
        <Image height={32} width={32} alt="profile picture" src={session?.user?.image || '/user.png'} className={`rounded-md hover ${path == '/profile' && 'border  border-neutral-600 outline-2 outline-neutral-200'}`} />
      </Link>

    </nav>
  )
}

export default Topbar