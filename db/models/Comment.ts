import mongoose , {Schema} from "mongoose";

const commentSchema = new Schema({
    content: String,
    username: String,
    user_id:String,
},
{
    timestamps:true
}
)

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment
