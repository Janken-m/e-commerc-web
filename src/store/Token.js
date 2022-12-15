import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "token",
  initialState: localStorage.getItem("token"),
  reducer: {
    SetToken: (state, action) => {
      console.log("token state redux", state);
      return state;
    },
  },
});

export const { SetToken } = slice.actions;

export default slice.reducer;
