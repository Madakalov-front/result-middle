import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ContactDto} from 'src/types/dto/ContactDto';
import type {RootState} from '../types';
import {selectAllContacts} from './contactsSlice';

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
});

export const {toggleFavorite} = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;

export const selectIsFavorite = (contactId: ContactDto['id']) => (state: RootState) =>
  state.favorites.ids.includes(contactId);

export const selectFavoriteContacts = (state: RootState) => {
  const contacts = selectAllContacts(state);
  const favoriteIds = selectFavoriteIds(state);

  return contacts.filter(({id}) => favoriteIds.includes(id));
};
