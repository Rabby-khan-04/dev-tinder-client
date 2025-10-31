import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null };

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    getConnections: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
