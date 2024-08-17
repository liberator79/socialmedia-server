const express = require("express")
const verifyToken = require("../middleware/auth")
const {getFeedPosts, getUserPosts, likePost} = require("../controllers/post.controller")
const postRouter = express.Router()


postRouter.get("/", verifyToken, getFeedPosts);
postRouter.get("/:userId/posts", verifyToken, getUserPosts);
postRouter.patch("/:id/like", verifyToken, likePost);


module.exports = postRouter

