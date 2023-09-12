import mongoose , {Schema} from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    bio: String,
    user_id: String,
    location: String,
    followers:[{
        type:[String],
        default:[],
       
    }],
    following:[{
        type:[String],
        default:[],
    }]
},
{
    timestamps:true
}
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
