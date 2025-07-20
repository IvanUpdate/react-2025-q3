import { render, screen } from '@testing-library/react';
import Results from './Results'; // Adjust path if needed
import { describe, expect, it } from 'vitest';
import { mockCharacters } from '../../__tests__/mockCharacters';

describe('Results/CardList Component', () => {
  it('renders correct number of items when data is provided', () => {
    render(<Results results={mockCharacters} loading={false} error={null} />);
    const cards = screen.getAllByRole('img');
    expect(cards.length).toBe(2);
  });

  it('displays "no results" message when data array is empty', () => {
    render(<Results results={[]} loading={false} error={null} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    render(<Results results={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('correctly displays item names and descriptions', () => {
    render(<Results results={mockCharacters} loading={false} error={null} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getAllByText('Human').length).toBe(2);
  });

  it('handles missing or undefined data gracefully', () => {
    const brokenData = [{ id: 3, name: '', species: '', image: '' }];

    render(<Results results={brokenData} loading={false} error={null} />);

    const image = screen.queryByRole('img');
    expect(image).toBeNull();
  });

  it('displays error message when API call fails', () => {
    render(<Results results={[]} loading={false} error="Failed to fetch" />);
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it('displays 4xx error message correctly', () => {
    render(<Results results={[]} loading={false} error="404 Not Found" />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('displays 5xx error message correctly', () => {
    render(
      <Results results={[]} loading={false} error="500 Internal Server Error" />
    );
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });
});
