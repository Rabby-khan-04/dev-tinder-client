import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice.js";
import feedReducer from "../utils/feedSlice.js";
import connectionReducer from "../utils/connectionSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
  },
});

export default store;
