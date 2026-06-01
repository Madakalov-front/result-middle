import type {ContactsState} from './slices/contactsSlice';
import type {FavoritesState} from './slices/favoritesSlice';
import type {GroupsState} from './slices/groupsSlice';

export interface RootState {
  contacts: ContactsState;
  favorites: FavoritesState;
  groups: GroupsState;
}
