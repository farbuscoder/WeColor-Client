import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkmode: false,
};

export const darkModeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    setDarkModeToTrue: (state) => {
      state.darkmode = true;
    },
    setDarkModeToFalse: (state) => {
      state.darkmode = false;
    },
  },
});

export const { setDarkModeToFalse, setDarkModeToTrue } = darkModeSlice.actions;

export default darkModeSlice.reducer;
