import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeedData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addFeedData } = feedSlice.actions;
export default feedSlice.reducer;
