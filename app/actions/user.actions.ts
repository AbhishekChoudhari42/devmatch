"use server"

import User from "@/db/models/User"
import connectDB from "@/db/mongodb"
type User = {
    username: String,
    email: String,
    bio: String,
    user_id: String,
    location: String,
}

type ReturnUser = {
    message: string,
    user: {
        username: String,
        email: String,
        bio: String,
        user_id: String,
        location: String,
    }
}
export const getUser = async <ReturnUser>(email: string) => {

    try {


        connectDB()
        let currentUser = await User.findOne({ email: email })
        return { message: "success", user: currentUser }

    }
    catch (error) {
        return { message: "error" }
    }
}