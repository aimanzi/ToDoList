import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config("../.env");
const mainserver = express();
mainserver.use(express.json());
mainserver.use(cors());
const port = process.env.PORT;
import connectToMDB from "../connectingToMD/connectingToMD.mjs";
import userSignUpRouter from "../routers/signup.mjs";
import userLogInRouter from "../routers/login.mjs";
import userTaskRouter from "../routers/task.mjs";
import logoutRouter from "../routers/logout.mjs";
import connectRouter from "../routers/conectToDb.mjs";

mainserver.get("/", (req, res) => {
  console.log("mainserver is running");
  res.json({ mainserver: "mainserver is running", status: true });
});

connectToMDB.ConnectToMD.Connect();

mainserver.use(userSignUpRouter);
mainserver.use(userLogInRouter);
mainserver.use(userTaskRouter);
mainserver.use(logoutRouter);
mainserver.use(connectRouter);

mainserver.listen(port, () => {
  console.log(`the server is listen to port http://localhost:${port}`);
});
