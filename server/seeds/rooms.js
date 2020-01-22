require("dotenv").config();

const Room = require("../models/Room");
const mongoose = require("mongoose");

const createRoom = async name => {
  try {
    const room = new Room({
      name,
      users: []
    });

    await room.save();
  } catch (error) {
    console.log(error);
  }
};

mongoose
  .connect("mongodb://localhost:27017/socket-chat")
  .then(() => {
    createRoom("amigos");
    createRoom("familiares");
    createRoom("grupo de pesados");
  })
  .catch(error => console.log(error));
