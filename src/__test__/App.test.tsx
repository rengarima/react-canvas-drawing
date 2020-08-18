
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('renders App', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Canvas Drawing Tool/i);
  expect(linkElement).toBeInTheDocument();
});
