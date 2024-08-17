const User = require("../models/user.model")

module.exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports.getUserFrnds = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, name, profilePic }) => {
                return { _id, name, profilePic };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}






// add/remove friend


module.exports.addRemoveFrnd = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const userProfile = User.findById(userId);
        const frndProfile = User.findById(friendId);
        if (userProfile.friends.includes(friendId)) {
            userProfile.friends = userProfile.friends.filter((id) => id !== friendId);
            frndProfile.friends = frndProfile.friends.filter((id) => id != userId);
        } else {
            userProfile.friends.push(friendId);
            frndProfile.friends.push(userId);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
            userProfile.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, name, profilePic }) => {
                return { _id, name, profilePic };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}