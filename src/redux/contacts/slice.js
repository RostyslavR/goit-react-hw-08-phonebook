import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from 'redux/contacts/operations';

const handlePending = state => {
  state.status = null;
  state.isLoading = true;
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
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.status = {
          title: 'Download error.',
          description: payload,
          status: 'error',
        };
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contactList = payload;
        state.isLoading = false;
        state.status = null;
        // {
        //   title: 'Ok',
        //   description: "It's good",
        //   status: 'success',
        // };
      })

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.status = {
          title: 'Error',
          description: payload,
          status: 'error',
        };
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contactList.push(payload);
        state.isLoading = false;
        state.status = null;
      })

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.status = {
          title: 'Error',
          description: payload,
          status: 'error',
        };
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contactList = state.contactList.filter(
          ({ id }) => id !== payload
        );
        state.isLoading = false;
        state.status = null;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
