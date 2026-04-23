import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from '../components/SearchForm';

jest.mock('../services/tmdb', () => ({
  searchMovies: jest.fn().mockResolvedValue([]),
}));

import { searchMovies } from '../services/tmdb';

describe('SearchForm validation', () => {

  test('valid input submits without errors', async () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);
    await userEvent.type(screen.getByPlaceholderText('Search Movies'), 'Inception');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
    expect(onSearch).toHaveBeenCalled();
  });

  test('empty input shows required error', async () => {
    render(<SearchForm onSearch={jest.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('Please type a Movie')).toBeInTheDocument();
  });

  test('input over 100 characters shows max length error', async () => {
    render(<SearchForm onSearch={jest.fn()} />);
    await userEvent.type(screen.getByPlaceholderText('Search Movies'), 'a'.repeat(101));
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('Search must be less than 100 characters')).toBeInTheDocument();
  });

  test('whitespace-only input shows required error', async () => {
    render(<SearchForm onSearch={jest.fn()} />);
    await userEvent.type(screen.getByPlaceholderText('Search Movies'), '   ');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('Please type a Movie')).toBeInTheDocument();
  });

  test('API is not called when validation fails', async () => {
    searchMovies.mockClear();
    render(<SearchForm onSearch={jest.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(searchMovies).not.toHaveBeenCalled();
  });

});
