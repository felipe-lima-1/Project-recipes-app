import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import MyProvider from '../context/myProvider';
import App from '../App';

describe('Testes da página meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetch);
  });
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const loginBtn = 'login-submit-btn';
  const validEmail = 'teste@teste.com';
  const recipeCardId = '0-recipe-card';
  const recipeName = 'Spicy Arrabiata Penne';

  it('', async () => {
    renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>,
    );
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginSubmitBtn = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, 'testesa');
    userEvent.click(loginSubmitBtn);

    await waitFor(() => screen.getByText('Corba'));
    const recipeCard = screen.getByTestId(recipeCardId);
    userEvent.click(recipeCard);

    await waitFor(() => screen.getByText(recipeName));
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);

    await waitFor(() => screen.getByText(recipeName));
    const labelIng = screen.getByTestId('0-ingredient-step');

    expect(labelIng).toBeInTheDocument();
  });
});
