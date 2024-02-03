import express from "express";
import cors from "cors";
import ConnectToMD from "../connectingToMD/connectingToMD.mjs";
const connectRouter = express.Router();
connectRouter.use(cors());
connectRouter.use(express.json());
connectRouter.post("/connectToDb", (req, res) => {
  console.log("connect to server");
  ConnectToMD.ConnectToMD.Connect();
  res.json({
    connect_status: true,
    message: "connect to MongoosDB server succsess",
  });
});

export default connectRouter;
