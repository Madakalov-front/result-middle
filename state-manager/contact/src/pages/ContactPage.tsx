import React, {memo, useMemo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import {QueryStatus} from 'src/components/QueryStatus';
import {useGetContactsQuery} from 'src/store/api/contactsApi';

export const ContactPage = memo(() => {
  const {contactId} = useParams<{contactId: string}>();
  const {data: contacts = [], isLoading, isError} = useGetContactsQuery();

  const contact = useMemo(
    () => contacts.find(({id}) => id === contactId),
    [contacts, contactId]
  );

  return (
    <QueryStatus isLoading={isLoading} isError={isError}>
      <Row xxl={3}>
        <Col className="mx-auto">
          {contact ? <ContactCard contact={contact} /> : <Empty />}
        </Col>
      </Row>
    </QueryStatus>
  );
});
