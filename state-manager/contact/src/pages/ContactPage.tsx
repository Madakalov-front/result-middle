import React from 'react';
import {observer} from 'mobx-react-lite';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import {QueryStatus} from 'src/components/QueryStatus';
import {useContactsStore} from 'src/store';
import {ContactRouteParams} from 'src/types/routes';

const ContactPageView = (): React.ReactElement => {
  const {contactId} = useParams<ContactRouteParams>();
  const store = useContactsStore();
  const contact = store.getContactById(contactId);

  return (
    <QueryStatus isLoading={store.contactsLoading} isError={store.contactsError}>
      <Row xxl={3}>
        <Col className="mx-auto">
          {contact ? <ContactCard contact={contact} /> : <Empty />}
        </Col>
      </Row>
    </QueryStatus>
  );
};

export const ContactPage = observer(ContactPageView);
