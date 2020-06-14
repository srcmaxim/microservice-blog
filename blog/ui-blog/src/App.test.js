import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App renders correctly', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/KOVAL MAKSYM/);
  expect(linkElement).toBeInTheDocument();
});
