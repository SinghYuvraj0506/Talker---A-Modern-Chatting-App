const jwt = require("jsonwebtoken");
const JWT_SECRET = "YuvrajSinghappofmychat";

const fetchuser2 = (token) => {
  // here we again extract the data within the authentification token and using it we get the details of the user
  const data = jwt.verify(token, JWT_SECRET);
  return data.user.id; // here data we entered is an object having object id as an other object inside user reference
};

//socket connection --------------------------------------------------

let users = []; // current live users on socket or client side
let onlyUsers = []   // stores only user ids for online details ------------
const port2 = 8900;

const addUser = async (usertoken, socketId) => {
    const userId = await fetchuser2(usertoken); // converting client auth token to the user id
  !users.some((user) => user.userId === userId) && // checks wheather the user is already in the list or not
    users.push({ userId, socketId }) 
    !onlyUsers.some((user) => user === userId) && onlyUsers.push(userId)
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId); // remove the user disconnected
  onlyUsers=[]   // refreshing onlyUsers on dissconnections
  users.forEach(element => {
    onlyUsers.push(element.userId)
  });
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const connectToSocket = () => {
  // connecttng server from client of socket ---------------------
  const io = require("socket.io")(port2, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  // on socket user connection --------------------------------------------
  io.on("connection", (socket) => {
    console.log("a user connected");
    //saves the user active on client or socket
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", {users,onlyUsers}); // send the users on the client side
    });

    // send and getting messages

    socket.on("sendMessage", async ({ sendertoken, recieverId, text }) => {
      const user = await getUser(recieverId); // search for the receiver
      const senderId = await fetchuser2(sendertoken);
      io.to(user?.socketId).emit("getMessage", {
        // sending message to a event on which user is present
        senderId,
        recieverId,
        text,
      });
    });

    // on socket user disconnection ---------------------------------------
    socket.on("disconnect", () => {
      console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", {users,onlyUsers}); // send the users on the client side
    });
  });
};

module.exports = connectToSocket;
