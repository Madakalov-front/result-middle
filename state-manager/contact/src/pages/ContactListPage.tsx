import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {QueryStatus} from 'src/components/QueryStatus';
import {useContactsStore} from 'src/store';
import {ContactDto} from 'src/types/dto/ContactDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

const ContactListPageView = (): React.ReactElement => {
  const store = useContactsStore();
  const [filter, setFilter] = useState<Partial<FilterFormValues>>({});

  const contacts: ContactDto[] = (() => {
    let result: ContactDto[] = store.contacts.slice();

    if (filter.name) {
      const nameQuery = filter.name.toLowerCase();
      result = result.filter((contact) =>
        contact.name.toLowerCase().includes(nameQuery)
      );
    }

    if (filter.groupId) {
      const group = store.groups.find((g: GroupContactsDto) => g.id === filter.groupId);

      if (group) {
        result = result.filter((contact) => group.contactIds.includes(contact.id));
      }
    }

    return result;
  })();

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    setFilter(fv);
  };

  return (
    <QueryStatus isLoading={store.isLoading} isError={store.isError}>
      <Row xxl={1}>
        <Col className="mb-3">
          <FilterForm groupContactsList={store.groups} initialValues={{}} onSubmit={onSubmit} />
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
};

export const ContactListPage = observer(ContactListPageView);
