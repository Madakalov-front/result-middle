import React, {memo, useMemo, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {QueryStatus} from 'src/components/QueryStatus';
import {useGetContactsQuery, useGetGroupsQuery} from 'src/store/api/contactsApi';

export const ContactListPage = memo(() => {
  const {
    data: allContacts = [],
    isLoading: isContactsLoading,
    isError: isContactsError,
  } = useGetContactsQuery();
  const {
    data: groups = [],
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useGetGroupsQuery();
  const [filter, setFilter] = useState<Partial<FilterFormValues>>({});

  const contacts = useMemo(() => {
    let result = allContacts;

    if (filter.name) {
      const nameQuery = filter.name.toLowerCase();
      result = result.filter(({name}) => name.toLowerCase().includes(nameQuery));
    }

    if (filter.groupId) {
      const group = groups.find(({id}) => id === filter.groupId);

      if (group) {
        result = result.filter(({id}) => group.contactIds.includes(id));
      }
    }

    return result;
  }, [allContacts, groups, filter]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    setFilter(fv);
  };

  return (
    <QueryStatus
      isLoading={isContactsLoading || isGroupsLoading}
      isError={isContactsError || isGroupsError}
    >
      <Row xxl={1}>
        <Col className="mb-3">
          <FilterForm groupContactsList={groups} initialValues={{}} onSubmit={onSubmit} />
        </Col>
        <Col>
          <Row xxl={4} className="g-4">
            {contacts.map((contact) => (
              <Col key={contact.id}>
                <ContactCard contact={contact} withLink />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </QueryStatus>
  );
});
