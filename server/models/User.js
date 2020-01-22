const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  username: {
    type: String
  },
  socketId: {
    type: String
  },
  room: {
    type: String,
    enum: ["amigos", "familiares", "grupo de pesados"]
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
