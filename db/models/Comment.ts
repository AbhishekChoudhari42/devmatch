import mongoose , {Schema} from "mongoose";

const commentSchema = new Schema({
    content: String,
    username: String,
    user_id:String,
    postId:String,
    likes:{
        type:[String],
        default:[]
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        default:[],
        ref:"Comment",
    }],

},
{
    timestamps:true
}
)

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment
