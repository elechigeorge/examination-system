import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const userSchema = new mongoose.Schema({
    fullname: String,
    matric_number: String,
    department: String,
    isStudent: {
        type: Boolean,
        default: true,
        required: true
    },
    email: String,
    password: String
});



userSchema.plugin(timestampsPlugin);

const User = mongoose.model("User", userSchema);


export default User;