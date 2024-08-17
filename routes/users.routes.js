const express = require("express")
const verifyToken = require("../middleware/auth")
const {getUserFrnds, getUser, addRemoveFrnd} = require("../controllers/user.controller")

const userRouter = express.Router();


userRouter.get("/:id", verifyToken, getUser);
userRouter.get("/:id/friends", getUserFrnds);

userRouter.patch("/:userId/:friendId", verifyToken, addRemoveFrnd);

module.exports = userRouter