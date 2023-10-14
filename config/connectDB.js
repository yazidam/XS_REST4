const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");
  } catch (error) {
    console.log("errr", error);
  }
};

module.exports = connectDB;
