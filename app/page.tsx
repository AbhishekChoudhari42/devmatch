import Image from 'next/image'
import { getServerSession } from 'next-auth'

export default async function Home() {
  return (
    <main className="text-white flex-grow bg-neutral-800 w-1/2 overflow-y-scroll relative p-4">
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      
     
    </main>
  )
}
