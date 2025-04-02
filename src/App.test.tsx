import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // Ensure the regex is correct
  expect(linkElement).toBeInTheDocument(); // Ensure @testing-library/jest-dom is installed
});