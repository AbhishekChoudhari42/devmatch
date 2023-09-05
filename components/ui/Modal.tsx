import React from 'react'
import Button from './Button'
import { motion } from 'framer-motion'

// interface ModalType {
//     text: string,
//     proceedAction:string
//     setModal:any,
//     proceedFn:any,
//     proceedFnLoading:boolean

// }

const Modal = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            className='w-full h-screen fixed top-0 left-0 bg-black/90 backdrop-blur-sm flex justify-center items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='w-1/2 max-sm:min-w-[300px] max-w-[500px] bg-black p-4 border-neutral-800 border rounded-md transit relative'>
                {children}
            </div>

        </motion.div>
    )
}

export default Modal