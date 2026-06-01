import React, {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {useAppSelector} from 'src/store/hooks';
import {selectFavoriteContacts} from 'src/store/slices/favoritesSlice';

export const FavoritListPage = memo(() => {
  const contacts = useAppSelector(selectFavoriteContacts);

  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
