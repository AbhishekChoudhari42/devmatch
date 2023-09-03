import React from 'react'
import Button from './Button'

// interface ModalType {
//     text: string,
//     proceedAction:string
//     setModal:any,
//     proceedFn:any,
//     proceedFnLoading:boolean

// }

const Modal = ({children}: {children:React.ReactNode}) => {
    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black/90 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-1/2 max-sm:min-w-[300px] max-w-[500px] bg-black p-4 border-neutral-800 border-2 rounded-md transit' >
                    {children}
            </div>

        </div>
    )
}

export default Modal