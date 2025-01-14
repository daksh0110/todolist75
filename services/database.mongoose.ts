const mongoose = require("mongoose");

export const initDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
};
