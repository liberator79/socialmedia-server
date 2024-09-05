const mongoose = require("mongoose");
const {Schema} = require("mongoose")

const postSchema = new Schema(
    {
        userId : {
            type : String,
            required : true,
        },
        name : {
            type : String,
            required : true,
        },
        postDescription : {
            type : String,
        },
        picturePath : {
            type : String,
            default : "",
        },
        userPicPath : {
            type : String,
        },
        likes : {
            type : Map,
            of : Boolean,
        },
        comments : {
            type : [String],
            default : []
        }
    },
    {timestamps: true}
)

const Post = mongoose.model("Posts", postSchema)
module.exports = Post;