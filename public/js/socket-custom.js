const socket = io("http://localhost:3000", {
  query: `token=${localStorage.getItem("token")}`
});

const params = new URLSearchParams(window.location.search);
const user = { name: localStorage.getItem("name"), room: "familia" };

// Escucha
socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor!!!!!");
});

socket.emit("chatJoin", user, data => {
  console.log(data);
});

socket.on("chatJoin", data => {
  console.log(data);
});

socket.on("error", data => {
  console.log(data);
});
// socket.on("userDisconnect", data => {
//   console.log("Usuario desconectado: ", data);
// });
// socket.emit(
//   "sendMessage",
//   { user: "jorge", message: "Hola mundo" }
//   // data => {
//   //   console.log(data);
//   // }
// );

// socket.on("sendMessage", data => {
//   console.log(data);
// });

// socket.on("privateMessage", data => {
//   console.log(data);
// });
