const { io } = require("../app");
const UsersClass = require("../classes/users");
const Users = new UsersClass();
module.exports = io.on("connection", client => {
  console.log("Usuario conectado");

  client.on("chatJoin", data => {
    const usersList = Users.addUser({ name: data.name, id: client.id });
    console.log(usersList);

    client.broadcast.emit("chatJoin", usersList);
  });

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
    const userDisconnected = Users.deleteUser(client.id);

    client.broadcast.emit("userDisconnect", userDisconnected);
  });

  client.on("sendMessage", (data, callback) => {
    console.log(data);

    // if (!data.user) callback({ message: "Debe proporcionar un usuario" });

    // callback(`Hola, ${data.user}`);

    client.broadcast.emit("sendMessage", data);
  });

  client.on("privateMessage", data => {
    console.log(data);
    client.broadcast
      .to(data.to)
      .emit("privateMessage", { name: data.from, message: data.message });
  });
});
