const express = require("express");
const connectToMongo = require("./db.js");
const cors = require("cors");
const connectToSocket = require("./socket.js");

require("dotenv").config();
const port = process.env.PORT || 8000;

connectToMongo();
const app = express();

app.use(cors({
  origin:process.env.CLIENT_URL
}));

app.use(express.json());

//socket connection  at 8900--------------------------------------------------

connectToSocket()

// Normal other routes at 8000 --------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Hello Guys");
});


app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/friend", require("./routes/friends"));

app.listen(port, () => {
  console.log(`Welcome to port ${port}`);
});
