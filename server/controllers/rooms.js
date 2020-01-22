const Room = require("../models/Room");
const updateRoom = async ({ name, _id }) => {
  const room = await Room.findOneAndUpdate(
    { name },
    { $push: { users: _id } },
    { new: true }
  ).populate("users");

  return room;
};
const deleteUser = async ({ name, _id }) => {
  const room = await Room.findOneAndUpdate(
    { name },
    { $pull: { users: _id } },
    { new: true }
  ).populate("users");

  return room;
};

const getRoom = async name => {
  const room = await Room.findOne({ name });
  return room;
};

module.exports = {
  updateRoom,
  deleteUser,
  getRoom
};
