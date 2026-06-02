import React, {createContext, useContext, useEffect, type ReactNode} from 'react';
import {ContactsStore} from './ContactsStore';
import {rootStore} from './rootStore';

const StoreContext = createContext<ContactsStore | null>(null);

export interface StoreProviderProps {
  store?: ContactsStore;
  children: ReactNode;
}

export const StoreProvider = ({store = rootStore, children}: StoreProviderProps): React.ReactElement => {
  useEffect(() => {
    void store.loadAll();
  }, [store]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useContactsStore = (): ContactsStore => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useContactsStore must be used within StoreProvider');
  }

  return store;
};
