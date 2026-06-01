import React, {memo, useMemo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import {useAppSelector} from 'src/store/hooks';
import {selectAllContacts} from 'src/store/slices/contactsSlice';
import {selectGroupById} from 'src/store/slices/groupsSlice';

export const GroupPage = memo(() => {
  const {groupId} = useParams<{groupId: string}>();
  const allContacts = useAppSelector(selectAllContacts);
  const groupContacts = useAppSelector(selectGroupById(groupId));

  const contacts = useMemo(() => {
    if (!groupContacts) {
      return [];
    }

    return allContacts.filter(({id}) => groupContacts.contactIds.includes(id));
  }, [allContacts, groupContacts]);

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
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
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
