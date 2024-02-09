import { createSlice } from "@reduxjs/toolkit";

const userOptionSlicer = createSlice({
  name: "headerOption",
  initialState: {
    selector: "",
  },

  reducers: {
    userSelect(state, action) {
      state.selector = action.payload;
    },
  },
});

export const { userSelect } = userOptionSlicer.actions;
export default userOptionSlicer.reducer;
