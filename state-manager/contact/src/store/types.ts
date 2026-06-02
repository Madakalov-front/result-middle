import type {contactsApi} from './api/contactsApi';
import type {FavoritesState} from './slices/favoritesSlice';

export interface RootState {
  favorites: FavoritesState;
  [contactsApi.reducerPath]: ReturnType<typeof contactsApi.reducer>;
}
