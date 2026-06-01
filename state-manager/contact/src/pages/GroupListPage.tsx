import React, {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {useAppSelector} from 'src/store/hooks';
import {selectAllGroups} from 'src/store/slices/groupsSlice';

export const GroupListPage = memo(() => {
  const groups = useAppSelector(selectAllGroups);

  return (
    <Row xxl={4}>
      {groups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
