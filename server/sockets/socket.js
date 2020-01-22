const { io } = require("../app");
const Users = require("../controllers/users");
const Rooms = require("../controllers/rooms");
const socketiojwt = require("socketio-jwt");

io.use(
  socketiojwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true
  })
);

module.exports = io.on("connection", client => {
  console.log("Usuario conectado");

  const { sub } = client.decoded_token;
  const userId = sub;
  console.log(username);

  client.on("chatJoin", async (data, callback) => {
    // estoy está sujeto a cambio cuando se cree el login
    if (!data || !data.name || !data.room)
      return callback("Debe proporciona nombre y sala");

    try {
      await Users.updateUser({ userId, socketId: client.id, room: data.room });

      const room = await Rooms.updateRoom({ _id: user._id, name: data.room });

      client.join(data.room);

      client.broadcast.to(data.room).emit("chatJoin", {
        message: `${data.name} se ha unido a la sesión`,
        usersRoom: room.users
      });
    } catch (error) {
      throw error;
    }
  });

  client.on("disconnect", async () => {
    console.log("Usuario desconectado");
    try {
      const user = await Users.getUser(client.id);
      console.log("user", user);
      await Users.deleteUser(client.id, {
        room: null
      });

      await Rooms.deleteUser({
        _id: user._id,
        name: user.room
      });

      const room = await Rooms.getRoom(user.room);
      client.broadcast.to(user.room).emit("chatJoin", {
        message: `${user.name} se ha ido de la sesión`,
        usersRoom: room.users
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  client.on("privateMessage", async data => {
    const { userIdTo, message } = data;

    const { socketId } = await Users.findById(userIdTo);

    client.broadcast.to(socketId).emit({ message });
  });

  // client.on("sendMessage", (data, callback) => {
  //   console.log(data);

  //   // if (!data.user) callback({ message: "Debe proporcionar un usuario" });

  //   // callback(`Hola, ${data.user}`);

  //   client.broadcast.emit("sendMessage", data);
  // });

  // client.on("privateMessage", data => {
  //   console.log(data);
  //   client.broadcast
  //     .to(data.to)
  //     .emit("privateMessage", { name: data.from, message: data.message });
  // });
});
