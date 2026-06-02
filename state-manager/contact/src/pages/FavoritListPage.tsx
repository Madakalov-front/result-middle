import React from 'react';
import {observer} from 'mobx-react-lite';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {QueryStatus} from 'src/components/QueryStatus';
import {useContactsStore} from 'src/store';

const FavoritListPageView = (): React.ReactElement => {
  const store = useContactsStore();

  return (
    <QueryStatus isLoading={store.contactsLoading} isError={store.contactsError}>
      <Row xxl={4} className="g-4">
        {store.favoriteContacts.map((contact) => (
          <Col key={contact.id}>
            <ContactCard contact={contact} withLink />
          </Col>
        ))}
      </Row>
    </QueryStatus>
  );
};

export const FavoritListPage = observer(FavoritListPageView);
