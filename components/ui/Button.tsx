"use client"

import { ReactNode } from "react"
import { JsxElement } from "typescript"

interface ButtonProps{
  isLoading:boolean,
  handleClick:any,
  children:ReactNode,
  style:string
}

import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const Button = ({isLoading,handleClick,children,style}:ButtonProps) => {



  return (
    <button className={`${style} h-10 rounded-md flex justify-center items-center border-2 text-white`} onClick={handleClick}>
        {!isLoading && <div>
          {children}
        </div>}
        {isLoading && <AiOutlineLoading3Quarters className="animate-spin text-white" />}
    </button>
  )
}

export default Button