// post.controller.js
const User = require("../models/user.model");
const Post = require("../models/posts.model");

// Create Post
module.exports.createPost = async (req, res) => {
    try {
        const { userId, postTitle, postDescription, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            name: user.name,
            postTitle,
            postDescription,
            picturePath,
            userPicPath: user.profilePic,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
};

// Get Feed Posts
module.exports.getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get User Posts
module.exports.getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Like/Unlike Post
module.exports.likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes[userId];

        if (isLiked) {
            delete post.likes[userId];
        } else {
            post.likes[userId] = true;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
