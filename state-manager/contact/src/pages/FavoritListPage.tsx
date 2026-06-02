import React, {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {QueryStatus} from 'src/components/QueryStatus';
import {useGetContactsQuery} from 'src/store/api/contactsApi';
import {useAppSelector} from 'src/store/hooks';
import {selectFavoriteContacts} from 'src/store/slices/favoritesSlice';

export const FavoritListPage = memo(() => {
  const {isLoading, isError} = useGetContactsQuery();
  const contacts = useAppSelector(selectFavoriteContacts);

  return (
    <QueryStatus isLoading={isLoading} isError={isError}>
      <Row xxl={4} className="g-4">
        {contacts.map((contact) => (
          <Col key={contact.id}>
            <ContactCard contact={contact} withLink />
          </Col>
        ))}
      </Row>
    </QueryStatus>
  );
});
