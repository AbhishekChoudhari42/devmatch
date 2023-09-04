import { GoHome, GoSearch } from 'react-icons/go'
import { IoCompassOutline } from 'react-icons/io5'
import { AiOutlineMessage } from 'react-icons/ai'
import { IoAddCircleOutline } from 'react-icons/io5'

import en from 'javascript-time-ago/locale/en.json'
import TimeAgo from 'javascript-time-ago'
TimeAgo.addLocale(en)
TimeAgo.addDefaultLocale(en)

export const navElements = [
    { route: "/", label: "Home", icon: GoHome },
    { route: "/search", label: "Search", icon: GoSearch },
    { route: "/create", label: "Create", icon: IoAddCircleOutline },
    { route: "/explore", label: "Explore", icon: IoCompassOutline },
    { route: "/messages", label: "Messages", icon: AiOutlineMessage },
]

