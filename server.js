const { Client } = require("node-osc");
const express = require("express");
const app = express();
const server = require("http").createServer(app);

// The URL that this server is deployed onto. Defaults to 'localhost'
const URL = process.env.URL || "127.0.0.1";

// Need to list the domains this is available on. Not sure if this
// comes into play consuming the data
const validDomains = [
  "https://glitch.me",
  "http://localhost",
  // "https://somewhereelse.com"
];

const io = require("socket.io")(server, {
  cors: { origin: validDomains },
});

// The port that the web/web socket portion of this server attaches to
const PORT = process.env.PORT || 3000;

// The port that the OSC client is created on
const OSC_PORT = 3333;

const osc = new Client(URL, OSC_PORT);

// This is when the 'board' connects to the server
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    //
  });

  // I don't know what event name the board sends out to its
  // websocket endpoint, so i am using 'data' at the moment
  socket.on("data", (value) => {
    osc.send("/value", value, () => {
      osc.close();
    });
  });

  // This could be smarter, receiving a value name from the source
  // data and then sending it to that channel specifically

  // socket.on('data', ({name, value}) => {
  //   osc.send(`/${name}`, value, () => {
  //     osc.close();
  //   });
  // })
});

app.use(express.static("public"));

server.listen(PORT, () => {
  console.log("server listening on " + PORT);
});
