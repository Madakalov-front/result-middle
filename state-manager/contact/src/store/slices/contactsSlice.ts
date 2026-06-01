import {createSlice} from '@reduxjs/toolkit';
import {ContactDto} from 'src/types/dto/ContactDto';
import type {RootState} from '../types';

export interface ContactsState {
  items: ContactDto[];
}

const initialState: ContactsState = {
  items: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
});

export const contactsReducer = contactsSlice.reducer;

export const selectAllContacts = (state: RootState) => state.contacts.items;

export const selectContactById = (contactId: string | undefined) => (state: RootState) =>
  contactId ? state.contacts.items.find(({id}) => id === contactId) : undefined;
