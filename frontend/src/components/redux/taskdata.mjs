import { createSlice } from "@reduxjs/toolkit";

const taskDataSlicer = createSlice({
  name: "taskdata",
  initialState: {
    taskinfo: [],
  },

  reducers: {
    addtask: (state, action) => {
      state.taskinfo = action.payload;
    },

    deletetask: (state, action) => {
      const task = action.payload.taskData;
      const removedItem = state.taskinfo.filter(
        (item) => item.taskid !== task.taskid
      );
      if (removedItem) {
        state.taskinfo = removedItem;
      }
    },

    editTask: (state, action) => {
      const task = action.payload.taskData;
      const id = action.payload.index;
      const newTaskData = state.taskinfo.map(
        (item) => item.taskid === task.taskid
      );
      if (newTaskData) {
        state.taskinfo[id] = task;
      }
    },
  },
});

export default taskDataSlicer.reducer;
export const { addtask, deletetask, editTask } = taskDataSlicer.actions;
