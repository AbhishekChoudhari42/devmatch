import Link from 'next/link'
import { useSession } from "next-auth/react"
import {GoHome , GoSearch} from 'react-icons/go'
import {MdOutlineExplore} from 'react-icons/md'
import {BiMessageDetail} from 'react-icons/bi'
import {IoAddCircleOutline} from 'react-icons/io5'


export const navElements = [
    { route:"/",label:"Home",icon:GoHome},
    { route:"/search",label:"Search",icon:GoSearch},
    { route:"/create",label:"Create",icon:IoAddCircleOutline},
    { route:"/explore",label:"Explore",icon:MdOutlineExplore},
    { route:"/messages",label:"Messages",icon:BiMessageDetail},
]

