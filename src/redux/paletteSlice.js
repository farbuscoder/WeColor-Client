import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPalette: null,
  loading: false,
  error: false,
};

export const paletteSlice = createSlice({
  name: "palette",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
  },
});

export const { loginStart } = paletteSlice.actions;

export default paletteSlice.reducer;
