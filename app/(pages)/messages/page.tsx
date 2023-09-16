"use client"

import User from "@/components/ui/User"
import useUserStore from "@/state/store"
import Link from "next/link"
const page = () => {

    const { user } = useUserStore()

    return (
        <div className="text-white">
            {
                user && user?.following.map((element: string[]) => {
                    return <div>
                        <Link href={`./messages/${element[0]}`}>
                            <User user_id={String(element[0])} />
                        </Link>
                    </div>
                })
            }
        </div>
    )
}

export default page