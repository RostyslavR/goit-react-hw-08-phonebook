import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, rememberUser } from 'redux/user/operations';

const handlePending = state => {
  state.status = null;
  state.isLoading = true;
};

const initialState = {
  data: null,
  token: null,
  isLoading: false,
  status: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.status = {
          title: 'Account not created.',
          description: payload,
          status: 'error',
        };
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.token = payload.token;
        state.isLoading = false;
        state.status = {
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
        };
      })

      .addCase(signIn.pending, handlePending)
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.status = {
          title: 'Logged in error.',
          description: payload,
          status: 'error',
        };
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.token = payload.rememberMe ? payload.token : null;
        state.isLoading = false;
        state.status = {
          title: 'Logged in successfully.',
          description: `Hello! ${payload.user.name}. You are signed in to your account.`,
          status: 'success',
        };
      })

      .addCase(rememberUser.pending, handlePending)
      .addCase(rememberUser.rejected, (state, { payload }) => {
        state.data = null;
        state.token = null;
        state.isLoading = false;
        state.status = null;
        // {
        //   title: 'The user not exist.',
        //   description: payload,
        //   status: 'error',
        // };
      })
      .addCase(rememberUser.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.isLoading = false;
        state.status = null;
        // {
        //   title: 'The user is verified',
        //   description: `Wellcome ${payload.user.name}`,
        //   status: 'success',
        // };
      })

      .addCase(signOut.pending, handlePending)
      .addCase(signOut.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.status = {
          title: 'Logout error',
          description: payload,
          status: 'error',
        };
      })

      .addCase(signOut.fulfilled, (state, { payload }) => {
        state.data = null;
        state.token = null;
        state.isLoading = false;
        state.status = {
          title: 'Logged out successfully.',
          description: 'See you later )',
          status: 'success',
        };
      });
  },
});

export const userReducer = userSlice.reducer;
// 'Something is wrong ...'
