import mongoose , {Schema} from "mongoose";

const postSchema = new Schema({
    content: String,
    user_id: String,
    username:String,
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

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post
