import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, rememberUser } from 'redux/user/operations';

const extraActions = [signUp, signIn, signOut, rememberUser];
const getActions = type => extraActions.map(action => action[type]);

const handlePending = state => {
  state.status = null;
  state.isLoading = true;
};

const signUpRj = (state, { payload }) => {
  state.isLoading = false;
  state.status = {
    title: 'Account not created.',
    description: payload,
    status: 'error',
  };
};

const signInRj = (state, { payload }) => {
  state.isLoading = false;
  state.status = {
    title: 'Logged in error.',
    description: payload,
    status: 'error',
  };
};

const signOutRj = (state, { payload }) => {
  state.isLoading = false;
  state.status = {
    title: 'Logout error',
    description: payload,
    status: 'error',
  };
};

const rmbRj = (state, { payload }) => {
  state.data = null;
  state.token = null;
  state.isLoading = false;
  state.status = null;
  // {
  //   title: 'The user not exist.',
  //   description: payload,
  //   status: 'error',
  // };
};

const signUpFf = (state, { payload }) => {
  state.data = payload.user;
  state.token = payload.token;
  state.isLoading = false;
  state.status = {
    title: 'Account created.',
    description: "We've created your account for you.",
    status: 'success',
  };
};

const signInFf = (state, { payload }) => {
  state.data = payload.user;
  state.token = payload.rememberMe ? payload.token : null;
  state.isLoading = false;
  state.status = {
    title: 'Logged in successfully.',
    description: `Hello! ${payload.user.name}. You are signed in to your account.`,
    status: 'success',
  };

};
const signOutFf = (state, { payload }) => {
  state.data = null;
  state.token = null;
  state.isLoading = false;
  state.status = {
    title: 'Logged out successfully.',
    description: 'See you later )',
    status: 'success',
  };
};

const rmbFf = (state, { payload }) => {
  state.data = payload.user;
  state.isLoading = false;
  state.status = null;
  // {
  //   title: 'The user is verified',
  //   description: `Wellcome ${payload.user.name}`,
  //   status: 'success',
  // };
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
      .addCase(signUp.rejected, signUpRj)
      .addCase(signUp.fulfilled, signUpFf)
      .addCase(signIn.rejected, signInRj)
      .addCase(signIn.fulfilled, signInFf)
      .addCase(signOut.rejected, signOutRj)
      .addCase(signOut.fulfilled, signOutFf)
      .addCase(rememberUser.rejected, rmbRj)
      .addCase(rememberUser.fulfilled, rmbFf)
      .addMatcher(isAnyOf(...getActions('pending')), handlePending);
  },
});

export const userReducer = userSlice.reducer;
