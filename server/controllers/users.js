const User = require("../models/User");

const addUser = async ({ name, id }) => {
  try {
    const user = new User({
      name,
      socketId: id
    });

    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUser = async id => {
  try {
    const user = await User.findOneAndUpdate(
      { socketId: id },
      { room: null, socketId: null }
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async ({ userId, socketId, room }) => {
  try {
    const user = await User.findByIdAndUpdate(userId, { socketId, room });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUser = async id => {
  try {
    const user = await User.findOne({ socketId: id });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  addUser,
  deleteUser,
  updateUser,
  getUser
};
