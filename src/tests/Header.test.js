import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../page/Meals';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testes do componente Header', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const loginBtn = 'login-submit-btn';
  it('Testa se ao clicar no icone a barra de busca aparece', () => {
    renderWithRouter(<Meals />);
    const searchTopBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });

  it('Testa se ao clicar no icone de perfil vai para a rota /profile e se o botão de pesquisa não é exibido', () => {
    const { history } = renderWithRouter(<Meals />);
    const profileTopBtn = screen.getByTestId('profile-top-btn');

    userEvent.click(profileTopBtn);

    const path = history.location.pathname;

    expect(path).toBe('/profile');
  });

  it('Verifica se ao clicar no botão é redirecionado para a rota e salva o email no local storage', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginSubmitBtn = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, 'validEmail@teste.com');
    userEvent.type(passwordInput, 'testesa');
    userEvent.click(loginSubmitBtn);
    const searchTopBtn = screen.getByTestId('search-top-btn');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileTopBtn);
    expect(searchTopBtn).not.toBeInTheDocument();
  });
});
