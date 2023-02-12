import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('user'),
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('isAuthenticated'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.token = localStorage.getItem('token');
      state.isAuthenticated = localStorage.getItem('isAuthenticated');
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = null;
    },
    update: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
