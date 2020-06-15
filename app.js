const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = 5000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.broadcast.emit("new client", "a new user has connected");

  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  socket.on("typing", function(typing) {
    console.log(typing);
    socket.broadcast.emit("typing", typing);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
    io.emit("disconnect", "user disconnected");
  });
});

http.listen(PORT, function() {
  console.log(`listening on ${PORT}`);
});
