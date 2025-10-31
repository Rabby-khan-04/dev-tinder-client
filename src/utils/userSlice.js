import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
