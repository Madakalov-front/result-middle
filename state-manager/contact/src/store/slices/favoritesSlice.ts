import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ContactDto} from 'src/types/dto/ContactDto';
import {contactsApi} from '../api/contactsApi';
import type {RootState} from '../types';

export interface FavoritesState {
  ids: ContactDto['id'][];
}

const initialState: FavoritesState = {
  ids: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ContactDto['id']>) => {
      const contactId = action.payload;
      const index = state.ids.indexOf(contactId);

      if (index >= 0) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(contactId);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      contactsApi.endpoints.getContacts.matchFulfilled,
      (state, {payload}) => {
        if (state.ids.length === 0 && payload.length > 0) {
          state.ids = payload.slice(0, 4).map(({id}) => id);
        }
      }
    );
  },
});

export const {toggleFavorite} = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;

export const selectIsFavorite = (contactId: ContactDto['id']) => (state: RootState) =>
  state.favorites.ids.includes(contactId);

export const selectFavoriteContacts = (state: RootState) => {
  const contacts = contactsApi.endpoints.getContacts.select()(state).data ?? [];
  const favoriteIds = selectFavoriteIds(state);

  return contacts.filter(({id}) => favoriteIds.includes(id));
};
