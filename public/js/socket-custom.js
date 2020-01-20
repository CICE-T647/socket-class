const socket = io();

const params = new URLSearchParams(window.location.search);

// Escucha
socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor!!!!!");
});

socket.emit(
  "sendMessage",
  { user: "jorge", message: "Hola mundo" }
  // data => {
  //   console.log(data);
  // }
);

socket.on("sendMessage", data => {
  console.log(data);
});

socket.emit("chatJoin", { name: params.get("name") });

socket.on("chatJoin", data => {
  console.log(data);
});

socket.on("userDisconnect", data => {
  console.log("Usuario desconectado: ", data);
});

socket.on("privateMessage", data => {
  console.log(data);
});
