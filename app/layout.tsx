import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from './AuthProvider'
import Topbar from '../components/shared/Topbar' 
import RightSidebar from '../components/shared/RightSidebar'
import SideNavigation from '../components/shared/SideNavigation'
import Bottombar from '../components/shared/Bottombar'
import ReactQueryProvider from './ReactQueryProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devmatch',
  description: 'Social app for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html className='w-screen h-full flex justify-center items-center bg-neutral-900' lang="en">
      <body className={inter.className}>
        
      <ReactQueryProvider>
        <AuthProvider>
          <section className='relative bg-neutral-950  max-w-[1300px]'>
              <main className='flex justify-between h-screen w-screen max-w-[1300px] pt-14 bg-neutral-950'>
                <Topbar/>
                  <SideNavigation/>
                    <div className='pt-4 max-sm:pt-12 flex-grow flex flex-col w-1/2 overflow-y-scroll pb-4 max-sm:pb-20  px-4'>
                      {children}
                    </div>
                  <RightSidebar/>
              </main>
            <Bottombar/>
          </section>
        </AuthProvider>
    </ReactQueryProvider>
      
      </body>
    </html>
  )
}
