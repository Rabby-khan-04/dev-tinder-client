import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null };

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    getRequests: (state, action) => {
      state.data = action.payload;
    },
    updateRequests: (state, action) => {
      const filteredRequest = state.data.filter(
        (item) => item._id !== action.payload
      );
      state.data = filteredRequest;
    },
  },
});

export const { getRequests, updateRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
