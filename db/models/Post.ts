import mongoose , {Schema} from "mongoose";

const postSchema = new Schema({
    content: String,
    user: String,
})