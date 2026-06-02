import React from 'react';
import {observer} from 'mobx-react-lite';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {QueryStatus} from 'src/components/QueryStatus';
import {useContactsStore} from 'src/store';

const GroupListPageView = (): React.ReactElement => {
  const store = useContactsStore();

  return (
    <QueryStatus isLoading={store.groupsLoading} isError={store.groupsError}>
      <Row xxl={4}>
        {store.groups.map((groupContacts) => (
          <Col key={groupContacts.id}>
            <GroupContactsCard groupContacts={groupContacts} withLink />
          </Col>
        ))}
      </Row>
    </QueryStatus>
  );
};

export const GroupListPage = observer(GroupListPageView);
