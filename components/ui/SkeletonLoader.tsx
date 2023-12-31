import React from 'react'
import { BiLoader } from 'react-icons/bi'
const SkeletonLoader = ({ styles, qty }: { styles: string, qty: number }) => {
    const array = new Array(qty).fill(BiLoader)

    return (
        <div className='w-full'>
            {
                array.map((BiLoader, index) => {

                    return <div key={index} className={`w-full flex justify-center items-center bg-neutral-800 rounded-md mb-4 animate-pulse ${styles}`}></div>
                })
            }

        </div>
    )
}

export default SkeletonLoader