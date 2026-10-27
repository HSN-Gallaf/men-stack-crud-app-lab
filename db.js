const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connect to database");
  } catch (err) {
    console.log("Error Message:", err);
  }
};

module.exports = connect;
