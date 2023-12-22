import { configureStore } from "@reduxjs/toolkit";
import AllReducers from "../index.mjs";

const store = configureStore({
  reducer: {
    AllReducers,
  },
});

store.subscribe(() => {
  var data = store.getState();
  console.log(data);
});

export default store;
