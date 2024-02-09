import { configureStore } from "@reduxjs/toolkit";
import allReducers from "../index.mjs";
import { persistStore, persistReducer } from "redux-persist";
const storage = require("redux-persist/lib/storage").default;

const persistConfig = {
  key: "todolist",
  storage,
};

const AllReducers = persistReducer(persistConfig, allReducers);

const store = configureStore({
  reducer: {
    AllReducers,
  },
});

store.subscribe(() => {
  var data = store.getState();
  console.log(data);
});

export const persistor = persistStore(store);
export default store;
