import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

export const createChat = async (req, res) => {
  const { currentUserId, otherUserId } = req.body;
  const users = [currentUserId, otherUserId];

  try {
    const isCurrentUserIdCorrect = await User.find({
      user: currentUserId,
    }).count();
    const isOtherUserIdCorrect = await User.find({ user: otherUserId }).count();

    if (isCurrentUserIdCorrect < 1)
      return res.status(200).send("current user id incorrect 1");
    if (isOtherUserIdCorrect < 1)
      return res.status(200).send("other user id incorrect 2");

    var isExistBefore = await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq: currentUserId } } },
        { users: { $elemMatch: { $eq: otherUserId } } },
      ],
    });

    if (isExistBefore) {
      return res.status(200).json(isExistBefore);
    }
    const newChat = new Chat({ users });
    await newChat.save();
    console.log(newChat);
    res.status(201).json(newChat);
  } catch (error) {
    console.log(error);
  }
};
