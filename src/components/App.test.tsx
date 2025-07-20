import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('makes initial API call on component mount', async () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await screen.findByText(/rick sanchez/i);
  });

  it('uses search term from localStorage on initial load', async () => {
    localStorage.setItem('searchTerm', 'Rick');
    render(<App />);
    await screen.findByText(/rick sanchez/i);
  });

  it('shows loading state during API calls', async () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
  });

  it('calls API with correct parameters when searching', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Rick');
    await userEvent.click(button);

    await screen.findByText(/rick sanchez/i);
  });

  it('handles successful API responses', async () => {
    render(<App />);
    await screen.findByText(/rick sanchez/i);
  });

  it('handles API error responses', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'error');
    await userEvent.click(button);

    await screen.findByText(/character not found/i);
  });

  it('updates component state based on API response', async () => {
    render(<App />);
    await screen.findByText(/rick sanchez/i);
    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toHaveAttribute('src', expect.stringContaining('rick'));
  });

  it('saves search term to localStorage and updates it correctly', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Morty');
    await userEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('Morty');
  });
});
