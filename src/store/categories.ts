import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    loadedCategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { loadedCategories } = slice.actions;
export default slice.reducer;
