// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

// Create an Express app
const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// Create a server using the Express app
const server = http.createServer(app);

// Create a Socket.io instance and attach it to the server
const wsServer = new Server(server,{ cors: { origin: '*'} });
const newSocketWithNamespace = wsServer.of('/hoicko')

newSocketWithNamespace.on('connection', (socket) => {
  socket.on('test', (data) => {
    console.log("data from client side", data);
    socket.emit('socket_from_server', `server side data ======> ${data}`)
  });
});

// Start the server
const port = 4000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

