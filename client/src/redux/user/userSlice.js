import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
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
    getTotal: (state, action) => {
      state.currentUser = { ...state.currentUser, total: action.payload };
    },
    getTotalAfterDelete: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        totalAfterDelete: action.payload,
      };
    },
    getDeliveryFee: (state, action) => {
      state.currentUser = { ...state.currentUser, deliveryFee: action.payload };
    },
    updateStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  addToCart,
  removeCart,
  getTotal,
  getTotalAfterDelete,
  getDeliveryFee,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;
export default userSlice.reducer;
