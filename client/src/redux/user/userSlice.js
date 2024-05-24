import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
    },
    addToCart: (state, action) => {
      state.currentUser = { ...state.currentUser, userCart: action.payload };
    },
    removeCart: (state, action) => {
      state.currentUser = { ...state.currentUser, userCart: action.payload };
    },
  },
});

export const { loginSuccess, logoutSuccess, addToCart, removeCart } =
  userSlice.actions;
export default userSlice.reducer;
