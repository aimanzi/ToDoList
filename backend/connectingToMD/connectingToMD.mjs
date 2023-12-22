import mongoose from "mongoose";

class ConnectToMD {
  static async Connect() {
    const url =
      "mongodb+srv://aimanzi:12345@cluster0.uwqonav.mongodb.net/TaskToDo";
    await mongoose
      .connect(url)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
      });
  }

  static async DisConnect() {
    mongoose
      .disconnect()
      .then(() => {
        console.log("DataBase staus:", "disconnecting from MongoDB Succsess");
      })
      .catch((err) => {
        console.error("Error disconnecting from database:", err);
      });
  }
}

export default { ConnectToMD };
