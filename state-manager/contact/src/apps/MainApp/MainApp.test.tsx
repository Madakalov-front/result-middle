import React from 'react';
import {render, screen} from '@testing-library/react';
import {MainApp} from './MainApp';

test('renders contacts app title', () => {
  render(<MainApp />);
  expect(screen.getByText(/Книга контактов/i)).toBeInTheDocument();
});
