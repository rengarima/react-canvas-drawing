//@ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders App', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Canvas Drawing Tool/i);
  expect(linkElement).toBeInTheDocument();
});
