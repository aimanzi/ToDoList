import { combineReducers } from "@reduxjs/toolkit";
import taskDataSlicer from "./taskdata.mjs";
import userDataSlicer from "./userdata.mjs";

const AllReducers = combineReducers({
  usertask: taskDataSlicer,
  userdata: userDataSlicer,
});

export default AllReducers;
