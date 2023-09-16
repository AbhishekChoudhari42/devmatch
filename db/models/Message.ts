import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
{
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    content:{
      type: String,
    },
  },
  { timestamps: true }

);

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

export default Message