import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tasktAdapter = createEntityAdapter();

const tasktSlice1 = createSlice({
  name: "tasks",
  initialState: tasktAdapter.getInitialState(),
  reducers: {
    addItem: tasktAdapter.addOne,
    removeItem: tasktAdapter.removeOne,
    updateItem: tasktAdapter.updateOne,
    clearItem: tasktAdapter.removeAll,
  },
});

export const {
  addItem,
  removeItem,
  updateItem,
  clearItem,
} = tasktSlice1.actions;
export default tasktSlice1.reducer;
