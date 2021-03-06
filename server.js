const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

/* ------ CREATING AND JOINING ROOMS FOR CONNECTION BETWEEN USERS ------ */

// room object to store the created room IDs
const users = {};
const socketToRoom = {};
const userList = [];

// when the user is forming a connection with socket.io
io.on("connection", (socket) => {
  console.log("on connection");
  // handling Group Video Call
  socket.on("join room group", (roomID) => {
    console.log("on join room group");
    // getting the room with the room ID and adding the user to the room
    if (users[roomID]) {
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }

    // returning new room with all the attendees after new attendee joined
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);
    socket.emit("all users", usersInThisRoom);
    console.log(`emit all users ${usersInThisRoom}`);
  });

  socket.on("send userList", (username) => {
    console.log(`send userList ${username}`);
    userList.push(username);
    io.emit("receive users", userList);
    console.log(`userList ${userList}`);
  });

  socket.on("send message", (item) => {
    //send message 이벤트 발생
    console.log(item.name + " : " + item.message);
    io.emit("receive message", { name: item.name, message: item.message });
    //클라이언트에 이벤트를 보냄
  });

  // sending signal to existing members when user join
  socket.on("sending signal", (payload) => {
    console.log("on sending signal");
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
    console.log("emit user joined");
  });

  // signal recieved by the user who joined
  socket.on("returning signal", (payload) => {
    console.log("on returning signal");
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
    console.log("emit receiving returned signal");
  });

  // handling user disconnect in group call
  socket.on("disconnect", () => {
    console.log("on disconnect");
    // getting the room array with all the participants
    const roomID = socketToRoom[socket.id];
    console.log(roomID);
    let room = users[roomID];
    console.log(`room : ${room}`);

    if (room) {
      // finding the person who left the room
      // creating a new array with the remaining people
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }

    // emiting a signal and sending it to everyone that a user left
    socket.broadcast.emit("user left", socket.id);
    console.log(`emit user left : ${socket.id} `);
  });
});

server.listen(8000, () => {
  console.log("the web server is running on port 8000");
});
