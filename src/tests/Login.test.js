import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da tela de login', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const loginBtn = 'login-submit-btn';
  const validEmail = 'teste@teste.com';

  it('Verifica se os elementos são renderizados', () => {
    render(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginSubmitBtn = screen.getByTestId(loginBtn);

    const elements = [emailInput, passwordInput, loginSubmitBtn];

    elements.forEach((elem) => expect(elem).toBeInTheDocument());
  });

  it('Verifica se o botão fica desabilitado sem dados corretos', () => {
    render(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginSubmitBtn = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, 'teste');
    userEvent.type(passwordInput, 'teste');

    expect(loginSubmitBtn).toBeDisabled();
  });

  it('Verifica se o botão fica habilitado com dados corretos', () => {
    render(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginSubmitBtn = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, 'testesa');

    expect(loginSubmitBtn).not.toBeDisabled();
  });

  it('Verifica se ao clicar no botão é redirecionado para a rota e salva o email no local storage', () => {
    render(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginSubmitBtn = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, 'testesa');
    userEvent.click(loginSubmitBtn);

    const userObj = { email: validEmail };
    expect(userObj).toEqual(JSON.parse(localStorage.getItem('user')));
  });
});
