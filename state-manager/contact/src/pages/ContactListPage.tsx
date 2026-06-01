import React, {memo, useMemo, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {useAppSelector} from 'src/store/hooks';
import {selectAllContacts} from 'src/store/slices/contactsSlice';
import {selectAllGroups} from 'src/store/slices/groupsSlice';

export const ContactListPage = memo(() => {
  const allContacts = useAppSelector(selectAllContacts);
  const groups = useAppSelector(selectAllGroups);
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
  );
});
