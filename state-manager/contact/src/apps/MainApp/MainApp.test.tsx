import React from 'react';
import {render, screen} from '@testing-library/react';
import {MainApp} from './MainApp';

const mockFetchResponse = (): Response =>
  ({
    ok: true,
    json: () => Promise.resolve([]),
  } as Response);

beforeEach(() => {
  global.fetch = jest.fn(
    (_input: RequestInfo | URL, _init?: RequestInit) => Promise.resolve(mockFetchResponse())
  );
});

test('renders contacts app title', () => {
  render(<MainApp />);
  expect(screen.getByText(/Книга контактов/i)).toBeInTheDocument();
});
