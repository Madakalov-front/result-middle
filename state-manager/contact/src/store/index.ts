import {configureStore} from '@reduxjs/toolkit';
import {contactsApi} from './api/contactsApi';
import {favoritesReducer} from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

export type {RootState} from './types';
export type AppDispatch = typeof store.dispatch;
