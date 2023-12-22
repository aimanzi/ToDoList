import express from "express";
import cors from "cors";
const userTaskRouter = express.Router();
import userTaskHandler from "../handlers/usertask.mjs";
userTaskRouter.use(cors());
userTaskRouter.use(express.json());

userTaskRouter.post("/user/tasklist/addtask", userTaskHandler.AddTask);
userTaskRouter.post("/user/tasklist", userTaskHandler.DisplayTask);
userTaskRouter.post("/user/tasklist/deletetask", userTaskHandler.DeleteTask);
userTaskRouter.post("/user/tasklist/editTask",userTaskHandler.EditTask )

export default userTaskRouter;
