import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../component/Footer';

describe('Testes do footer', () => {
  it('teste botao drinks', () => {
    const { history } = renderWithRouter(<Footer />);
    const button = screen.getByTestId('drinks-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('teste botao meals', () => {
    const { history } = renderWithRouter(<Footer />);
    const button = screen.getByTestId('meals-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
