const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ahmed:ahmed@cluster0.imyyklz.mongodb.net/"
    );
    console.log("database connected");
  } catch (error) {
    console.log("errr", error);
  }
};

module.exports = connectDB;
