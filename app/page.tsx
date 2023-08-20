import Image from 'next/image'
import { getServerSession } from 'next-auth'
export default async function Home() {
  return (
    <main className="w-full  text-white">
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div>
      <div className='h-[300px] w-full bg-neutral-950 mb-4 rounded-md p-4'>helloo you are signed in</div> 
    </main>
  )
}
