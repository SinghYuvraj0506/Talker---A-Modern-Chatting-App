const mongoose = require("mongoose");
require("dotenv").config();

//const url = "mongodb://localhost:27017/myChat";
const url = process.env.DB_URL;

const connectToMongo = () => {
  mongoose.connect(url, () => {
    console.log("Connected to mongo successfully!!");
  });
};

module.exports = connectToMongo;
