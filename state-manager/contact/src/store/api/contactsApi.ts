import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CONTACTS_API_URL, GROUPS_API_URL} from 'src/constants/api';
import {ContactDto} from 'src/types/dto/ContactDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({baseUrl: ''}),
  endpoints: (builder) => ({
    getContacts: builder.query<ContactDto[], void>({
      query: () => CONTACTS_API_URL,
    }),
    getGroups: builder.query<GroupContactsDto[], void>({
      query: () => GROUPS_API_URL,
    }),
  }),
});

export const {useGetContactsQuery, useGetGroupsQuery} = contactsApi;
