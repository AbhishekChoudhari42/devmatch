import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from './AuthProvider'
import Topbar from '../components/shared/Topbar' 
import SideNavigation from '../components/shared/SideNavigation'
import RightSidebar from '../components/shared/RightSidebar'
import Bottombar from '../components/shared/Bottombar'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='w-screen h-full flex justify-center items-center bg-neutral-900' lang="en">
      <body className={inter.className}>
        <AuthProvider>

        <section className='relative bg-black  max-w-[1300px]'>
            <main className='flex justify-between h-screen w-screen max-w-[1300px] pt-14 bg-neutral-800'>
            <Topbar/>
              <SideNavigation/>
              <div className='pt-8 flex-grow w-1/2 overflow-y-scroll px-4 pb-20'>
                 {children}
              </div>
              <RightSidebar/>
            </main>
            <Bottombar/>
        </section>
        </AuthProvider>
      </body>
    </html>
  )
}
