import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../page/Profile';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes do profile', () => {
  it('teste botao done recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-done-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('teste botao favorite recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-favorite-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('teste botao logout', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-logout-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
