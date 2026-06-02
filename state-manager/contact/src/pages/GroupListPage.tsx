import React, {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {QueryStatus} from 'src/components/QueryStatus';
import {useGetGroupsQuery} from 'src/store/api/contactsApi';

export const GroupListPage = memo(() => {
  const {data: groups = [], isLoading, isError} = useGetGroupsQuery();

  return (
    <QueryStatus isLoading={isLoading} isError={isError}>
      <Row xxl={4}>
        {groups.map((groupContacts) => (
          <Col key={groupContacts.id}>
            <GroupContactsCard groupContacts={groupContacts} withLink />
          </Col>
        ))}
      </Row>
    </QueryStatus>
  );
});
