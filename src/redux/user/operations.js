import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signUp = createAsyncThunk(
  'user/signup',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      const message = 'Account created.';
      return { ...res.data, message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'user/signin',
  async ({ rememberMe, ...credentials }, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      const message = `Hello! ${res.data.user.name}`;
      return { ...res.data, rememberMe, message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk('user/signuot', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    const message = 'See you later';
    clearAuthHeader();
    return { message };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const rememberUser = createAsyncThunk(
  'user/remember',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.user.token;

    try {
      if (persistedToken === null) {
        throw new Error();
      }
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      const message = `Hello! ${res.data.name}`;
      return { user: res.data, message };
    } catch (error) {
      return thunkAPI.rejectWithValue('Authenticate please');
    }
  }
);


