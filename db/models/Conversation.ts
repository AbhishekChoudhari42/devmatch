import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema({
    members: {
        type: Array,
    }
    },
    { timestamps: true }
)

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema)

export default Conversation
