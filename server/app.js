require("dotenv").config();
const express = require("express");

const path = require("path");
const http = require("http");
const app = express();
const socketIO = require("socket.io");
const server = http.createServer(app);
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
const bodyParser = require("body-parser");
const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./passport/config")(app);

app.use("/", require("./routes/auth"));

module.exports.io = socketIO(server);
require("./sockets/socket");

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch(e => {
    throw error;
  });

server.listen(port, err => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
