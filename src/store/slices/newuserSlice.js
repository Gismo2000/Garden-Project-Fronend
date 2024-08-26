import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const newuserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addNewUser } = newuserSlice.actions;
export default newuserSlice.reducer;