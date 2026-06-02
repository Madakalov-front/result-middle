import React from 'react';
import {Alert, Spinner} from 'react-bootstrap';

interface QueryStatusProps {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
}

export const QueryStatus = ({isLoading, isError, children}: QueryStatusProps) => {
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">Не удалось загрузить данные. Попробуйте обновить страницу.</Alert>;
  }

  return <>{children}</>;
};
