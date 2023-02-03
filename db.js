const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/myChat";

const connectToMongo = () => {
  mongoose.connect(url, () => {
    console.log("Connected to mongo successfully!!");
  });
};

module.exports = connectToMongo;
