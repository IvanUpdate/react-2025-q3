// Search.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and search button', () => {
    const handleSearchMock = vi.fn();
    render(<Search request="" handleSearch={handleSearchMock} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchTerm', 'Rick Sanchez');

    render(<Search request="" handleSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Rick Sanchez');
  });

  it('shows empty input when no saved term exists', () => {
    render(<Search request="" handleSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });
});

describe('Search Component – User Interactions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<Search request="" handleSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Rick');

    expect(input).toHaveValue('Rick');
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<Search request="" handleSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Morty');
    await user.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('Morty');
  });

  it('trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    const handleSearchMock = vi.fn();

    render(<Search request="" handleSearch={handleSearchMock} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   Summer  ');
    await user.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('Summer');

    expect(handleSearchMock).toHaveBeenCalledWith('Summer');
  });

  it('triggers search callback with correct parameters', async () => {
    const user = userEvent.setup();
    const handleSearchMock = vi.fn();

    render(<Search request="" handleSearch={handleSearchMock} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Beth');
    await user.click(button);

    expect(handleSearchMock).toHaveBeenCalledTimes(1);
    expect(handleSearchMock).toHaveBeenCalledWith('Beth');
  });
});

describe('Search Component – localStorage integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves saved search term on component mount', () => {
    localStorage.setItem('searchTerm', 'Saved Rick');

    render(<Search request="" handleSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Saved Rick');
  });

  it('overwrites existing localStorage value when new search is performed', async () => {
    const user = userEvent.setup();

    localStorage.setItem('searchTerm', 'Old Search');

    render(<Search request="" handleSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'New Morty');
    await user.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('New Morty');
  });
});

describe('Search Component – handleKeyDown', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('calls search when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const handleSearchMock = vi.fn();

    render(<Search request="" handleSearch={handleSearchMock} />);

    const input = screen.getByRole('textbox');

    await user.type(input, '  Rick ');

    await user.keyboard('{Enter}');

    expect(handleSearchMock).toHaveBeenCalledWith('Rick');

    expect(localStorage.getItem('searchTerm')).toBe('Rick');
  });
});
