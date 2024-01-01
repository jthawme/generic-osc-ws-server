const url = "https://oceanic-farm.glitch.me";
const socket = io.connect(url);

socket.on("connect", () => {
  console.log("connected!");
});

socket.on("reconnect", (attemptNumber) => {
  console.log("reconnecting...");
});

socket.on("chat message", (msg) => {
  //
});
