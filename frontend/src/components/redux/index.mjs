import { combineReducers } from "@reduxjs/toolkit";
import taskDataSlicer from "./taskdata.mjs";
import userDataSlicer from "./userdata.mjs";
import userSelect from "./userOption.mjs";

const AllReducers = combineReducers({
  usertask: taskDataSlicer,
  userdata: userDataSlicer,
  userselect: userSelect,
});

export default AllReducers;
