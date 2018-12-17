const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketio(server);

// NOTE: io.on("", socket => { setInterval }) creates a new interval 
// for every connected client.
let interval;

io.on("connection", socket => {
  console.log("NEW CLIENT CONNECTED");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getAPIandEmit(socket), 10000);
  socket.on("disconnect", () => { console.log("CLIENT DISCONNECTED") });
});

const getAPIandEmit = async socket => {
  try {
    const res = await axios.get("http://localhost:3000/values");
  } catch (error) {
    console.error(`ERROR: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port} ...`));
