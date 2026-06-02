import {makeAutoObservable, runInAction} from 'mobx';
import {CONTACTS_API_URL, GROUPS_API_URL} from 'src/constants/api';
import {ContactDto} from 'src/types/dto/ContactDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

export class ContactsStore {
  contacts: ContactDto[] = [];
  groups: GroupContactsDto[] = [];
  favoriteIds: ContactDto['id'][] = [];

  contactsLoading = false;
  groupsLoading = false;
  contactsError = false;
  groupsError = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading(): boolean {
    return this.contactsLoading || this.groupsLoading;
  }

  get isError(): boolean {
    return this.contactsError || this.groupsError;
  }

  get favoriteContacts(): ContactDto[] {
    return this.contacts.filter(({id}) => this.favoriteIds.includes(id));
  }

  getContactById(contactId: string | undefined): ContactDto | undefined {
    return contactId ? this.contacts.find(({id}) => id === contactId) : undefined;
  }

  getGroupById(groupId: string | undefined): GroupContactsDto | undefined {
    return groupId ? this.groups.find(({id}) => id === groupId) : undefined;
  }

  getContactsByGroupId(groupId: string | undefined): ContactDto[] {
    const group = this.getGroupById(groupId);

    if (!group) {
      return [];
    }

    return this.contacts.filter(({id}) => group.contactIds.includes(id));
  }

  toggleFavorite(contactId: ContactDto['id']): void {
    const index = this.favoriteIds.indexOf(contactId);

    if (index >= 0) {
      this.favoriteIds.splice(index, 1);
    } else {
      this.favoriteIds.push(contactId);
    }
  }

  isFavorite(contactId: ContactDto['id']): boolean {
    return this.favoriteIds.includes(contactId);
  }

  async loadAll(): Promise<void> {
    await Promise.all([this.fetchContacts(), this.fetchGroups()]);
  }

  async fetchContacts(): Promise<void> {
    this.contactsLoading = true;
    this.contactsError = false;

    try {
      const data = await this.fetchJson<ContactDto[]>(CONTACTS_API_URL);

      runInAction(() => {
        this.contacts = data;

        if (this.favoriteIds.length === 0 && data.length > 0) {
          this.favoriteIds = data.slice(0, 4).map(({id}) => id);
        }

        this.contactsLoading = false;
      });
    } catch {
      runInAction(() => {
        this.contactsError = true;
        this.contactsLoading = false;
      });
    }
  }

  async fetchGroups(): Promise<void> {
    this.groupsLoading = true;
    this.groupsError = false;

    try {
      const data = await this.fetchJson<GroupContactsDto[]>(GROUPS_API_URL);

      runInAction(() => {
        this.groups = data;
        this.groupsLoading = false;
      });
    } catch {
      runInAction(() => {
        this.groupsError = true;
        this.groupsLoading = false;
      });
    }
  }

  private async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data as T;
  }
}
