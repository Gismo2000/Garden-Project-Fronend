import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: JSON.parse(localStorage.getItem("theme")) || 'light',
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem('theme', JSON.stringify(state.theme))
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
