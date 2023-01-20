import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from 'redux/contacts/operations';

import { signOut } from 'redux/user/operations';

const extraActions = [fetchContacts, addContact, deleteContact];

const getActions = type => extraActions.map(action => action[type]);

const handlePending = state => {
  state.status = null;
  state.isLoading = true;
};

const resetIsLoading = state => (state.isLoading = false);

const resetState = state => {
  state.isLoading = false;
  state.status = null;
  // {
  //   title: 'Ok',
  //   description: "It's good",
  //   status: 'success',
  // };
};

const fetchRj = (state, { payload }) => {
  state.status = {
    title: 'Download error.',
    description: payload,
    status: 'error',
  };
};

const anyRj = (state, { payload }) => {
  state.status = {
    title: 'Something is wrong ...',
    description: payload,
    status: 'error',
  };
};

const fetchFf = (state, { payload }) => {
  state.contactList = payload;
};

const addFf = (state, { payload }) => {
  state.contactList.push(payload);
};

const delFf = (state, { payload }) => {
  state.contactList = state.contactList.filter(({ id }) => id !== payload);
};

const resetContacts = state => {
  return initialState;
};

const initialState = {
  contactList: [],
  status: null,
  isLoading: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.rejected, fetchRj)
      .addCase(fetchContacts.fulfilled, fetchFf)
      .addCase(addContact.rejected, anyRj)
      .addCase(addContact.fulfilled, addFf)
      .addCase(deleteContact.rejected, anyRj)
      .addCase(deleteContact.fulfilled, delFf)
      .addCase(signOut.fulfilled, resetContacts)
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('rejected')), resetIsLoading)
      .addMatcher(isAnyOf(...getActions('fulfilled')), resetState);
  },
});

export const contactsReducer = contactsSlice.reducer;
