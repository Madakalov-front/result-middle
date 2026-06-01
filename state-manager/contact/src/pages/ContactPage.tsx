import React, {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import {useAppSelector} from 'src/store/hooks';
import {selectContactById} from 'src/store/slices/contactsSlice';

export const ContactPage = memo(() => {
  const {contactId} = useParams<{contactId: string}>();
  const contact = useAppSelector(selectContactById(contactId));

  return (
    <Row xxl={3}>
      <Col className="mx-auto">
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
});
