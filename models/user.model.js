const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            required: true,
            minlength: 8,  
        },
        email: {  
            type: String,
            required: true,
            unique: true,
        },
        friends: {
            type: [Schema.Types.ObjectId],  
            ref: "User",
            default: [],
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;  
