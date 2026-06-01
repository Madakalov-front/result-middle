import {createSlice} from '@reduxjs/toolkit';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';
import type {RootState} from '../types';

export interface GroupsState {
  items: GroupContactsDto[];
}

const initialState: GroupsState = {
  items: [],
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
});

export const groupsReducer = groupsSlice.reducer;

export const selectAllGroups = (state: RootState) => state.groups.items;

export const selectGroupById = (groupId: string | undefined) => (state: RootState) =>
  groupId ? state.groups.items.find(({id}) => id === groupId) : undefined;
