import mongoose , {Schema} from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    bio: String,
    id: String,
},
{
    timestamps:true
}
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
