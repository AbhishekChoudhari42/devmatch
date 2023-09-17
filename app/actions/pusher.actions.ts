"user server"
import { pusherServer } from "@/lib/pusher"

export const pusherAuth = async (socket_id: string, channel_name: string, user_id: string) => {

    const presenceData = {
        user_id: user_id,
        user_data: { user_id: user_id } 
    }

    try {

        const auth = pusherServer.authorizeChannel(socket_id, channel_name, presenceData)
        return JSON.stringify(auth)

    } catch (error) {

        console.log(error)

    }

}


