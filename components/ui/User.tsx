import { getUserById } from '@/app/actions/user.actions'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
import SkeletonLoader from './SkeletonLoader'

const User = ({ user_id }: { user_id: string }) => {

    const getUserQuery = useQuery([`getuser${user_id}`], async () => {
        const res = await getUserById(user_id)
        return res.user
    })

    return (
    <>
        {getUserQuery.data ?
            (<div className='w-full border border-neutral-800 rounded-md p-4 flex gap-4 mb-4'>
                <Image className='rounded-md' width={50} height={50} src={`https://avatars.githubusercontent.com/u/${user_id}?v=4`} alt="user image" />
                <div>
                    <h2 className='font-semibold text-lg mb-1'>{getUserQuery.data?.username}</h2>
                    <p className='text-sm text-neutral-500 '>{getUserQuery.data?.email}</p>
                </div>
            </div>) : (
                <SkeletonLoader styles="h-[300px]" qty={1} />
            )
        }

    </>
    )
}

export default User