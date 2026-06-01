import {configureStore} from '@reduxjs/toolkit';
import {DATA_CONTACT, DATA_GROUP_CONTACT} from 'src/__data__';
import {contactsReducer} from './slices/contactsSlice';
import {favoritesReducer} from './slices/favoritesSlice';
import {groupsReducer} from './slices/groupsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    favorites: favoritesReducer,
    groups: groupsReducer,
  },
  preloadedState: {
    contacts: {items: DATA_CONTACT},
    favorites: {
      ids: DATA_CONTACT.slice(0, 4).map(({id}) => id),
    },
    groups: {items: DATA_GROUP_CONTACT},
  },
});

export type {RootState} from './types';
export type AppDispatch = typeof store.dispatch;
