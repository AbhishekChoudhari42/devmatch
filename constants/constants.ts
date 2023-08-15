import Link from 'next/link'
import { useSession } from "next-auth/react"
import {GoHome , GoSearch} from 'react-icons/go'
import {MdExplore} from 'react-icons/md'
import {BiMessageDetail} from 'react-icons/bi'
import {IoNotificationsOutline} from 'react-icons/io5'
import {TbLogout} from 'react-icons/tb'

export const navElements = [
    { route:"/",label:"Home",icon:GoHome},
    { route:"/search",label:"Search",icon:GoSearch},
    { route:"/explore",label:"Explore",icon:MdExplore},
    { route:"/messages",label:"Messages",icon:BiMessageDetail},
    { route:"/notifications",label:"Notifications",icon:IoNotificationsOutline},
]

