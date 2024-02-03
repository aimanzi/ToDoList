import express from "express";
import cors from "cors";
import DisConnect from "../connectingToMD/connectingToMD.mjs";
const logout = express.Router();
logout.use(cors());
logout.use(express.json());

logout.post("/logout", (req, res) => {
  console.log("disconnect from MongoosDB server");
  DisConnect.ConnectToMD.DisConnect();
  res.json({
    disconnect_status: true,
    message: "disconnect from MongoosDB server succsess",
  });
});

export default logout;
