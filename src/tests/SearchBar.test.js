import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../page/Meals';
import Drinks from '../page/Drinks';
import renderWithRouter from './utils/renderWithRouter';
import MyProvider from '../context/myProvider';
import fetch from './utils/fetch';

describe('Testa do componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetch);
  });

  const idSearchTopBtn = 'search-top-btn';
  const idSearchInput = 'search-input';
  const idExecSearchBtn = 'exec-search-btn';
  const idFirstLetterSearchRadio = 'first-letter-search-radio';

  it('Testa pesquisa por ingrediente', async () => {
    renderWithRouter(
      <MyProvider>
        <Meals />
      </MyProvider>,
      ['/meals'],
    );

    const searchTopBtn = screen.getByTestId(idSearchTopBtn);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(idSearchInput);
    const execSearchBtn = screen.getByTestId(idExecSearchBtn);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => screen.getByText('Brown Stew Chicken'));
    const twelveMeals = await screen.findAllByTestId(/-card-name/i);
    expect(twelveMeals.length).toBe(10);
  });

  it('Testa pesquisa por nome', async () => {
    renderWithRouter(
      <MyProvider>
        <Meals />
      </MyProvider>,
      ['/meals'],
    );

    const searchTopBtn = screen.getByTestId(idSearchTopBtn);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(idSearchInput);
    const execSearchBtn = screen.getByTestId(idExecSearchBtn);
    const nameSearchRadio = screen.getByTestId('name-search-radio');

    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => screen.getByText(/Arrabiata/i));
    const twelveMeals = await screen.findAllByTestId(/-card-name/i);
    expect(twelveMeals.length).toBe(1);
  });

  it('Testa pesquisa por primeiraLetra', async () => {
    renderWithRouter(
      <MyProvider>
        <Meals />
      </MyProvider>,
      ['/meals'],
    );

    const searchTopBtn = screen.getByTestId(idSearchTopBtn);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(idSearchInput);
    const execSearchBtn = screen.getByTestId(idExecSearchBtn);
    const firstLetterSearchRadio = screen.getByTestId(idFirstLetterSearchRadio);

    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'Ar');
    userEvent.click(execSearchBtn);
  });

  it('Testa pesquisa por ingrediente chicken', async () => {
    renderWithRouter(
      <MyProvider>
        <Meals />
      </MyProvider>,
      ['/meals'],
    );

    const searchTopBtn = screen.getByTestId(idSearchTopBtn);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(idSearchInput);
    const execSearchBtn = screen.getByTestId(idExecSearchBtn);
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientSearchRadio);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => screen.getByText('Brown Stew Chicken'));
    const twelveMeals = await screen.findAllByTestId(/-card-name/i);
    expect(twelveMeals.length).toBe(10);
  });

  it('Testa pesquisa do drink por ingrediente', async () => {
    renderWithRouter(
      <MyProvider>
        <Drinks />
      </MyProvider>,
      ['/drinks'],
    );

    const searchTopBtn = screen.getByTestId(idSearchTopBtn);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(idSearchInput);
    const execSearchBtn = screen.getByTestId(idExecSearchBtn);
    userEvent.type(searchInput, 'Light rum');
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => screen.getByText('151 Florida Bushwacker'));
    const twelveMeals = await screen.findAllByTestId(/-card-name/i);
    expect(twelveMeals.length).toBe(12);
  });

  it('Testa pesquisa do drink', async () => {
    renderWithRouter(
      <MyProvider>
        <Drinks />
      </MyProvider>,
      ['/drinks'],
    );

    const searchTopBtn = screen.getByTestId(idSearchTopBtn);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(idSearchInput);
    const execSearchBtn = screen.getByTestId(idExecSearchBtn);
    const firstLetterSearchRadio = screen.getByTestId(idFirstLetterSearchRadio);

    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'Ar');
    userEvent.click(execSearchBtn);
  });

  it('Testa pesquisa do meals por primeira letra', async () => {
    renderWithRouter(
      <MyProvider>
        <Meals />
      </MyProvider>,
      ['/meals'],
    );

    const searchTopBtn = screen.getByTestId(idSearchTopBtn);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(idSearchInput);
    const execSearchBtn = screen.getByTestId(idExecSearchBtn);
    const firstLetterSearchRadio = screen.getByTestId(idFirstLetterSearchRadio);

    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchBtn);
  });

  it('Testa pesquisa do drink por nome', async () => {
    renderWithRouter(
      <MyProvider>
        <Drinks />
      </MyProvider>,
      ['/drinks'],
    );

    const searchTopBtn = screen.getByTestId(idSearchTopBtn);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(idSearchInput);
    const execSearchBtn = screen.getByTestId(idExecSearchBtn);
    const nameSearchRadio = screen.getByTestId('name-search-radio');

    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => screen.getByText(/Aquamarine/i));
    const twelveMeals = await screen.findAllByTestId(/-card-name/i);
    expect(twelveMeals.length).toBe(1);
  });

  // it('Testa pesquisa do drink por primeira letra', async () => {
  //   renderWithRouter(
  //     <MyProvider>
  //       <Drinks />
  //     </MyProvider>,
  //     ['/drinks'],
  //   );

  //   const searchTopBtn = screen.getByTestId(idSearchTopBtn);
  //   userEvent.click(searchTopBtn);

  //   const searchInput = screen.getByTestId(idSearchInput);
  //   const execSearchBtn = screen.getByTestId(idExecSearchBtn);
  //   const firstLetterSearchRadio = screen.getByTestId(idFirstLetterSearchRadio);

  //   userEvent.click(firstLetterSearchRadio);
  //   userEvent.type(searchInput, 'v');
  //   userEvent.click(execSearchBtn);

  //   const twelveMeals = await screen.findAllByTestId(/-card-name/i);
  //   expect(twelveMeals.length).toBe(12);
  // });

  // it('Testa pesquisa do drink por primeira letra', async () => {
  //   renderWithRouter(
  //     <MyProvider>
  //       <Drinks />
  //     </MyProvider>,
  //     ['/drinks'],
  //   );

  //   const searchTopBtn = screen.getByTestId(idSearchTopBtn);
  //   userEvent.click(searchTopBtn);

  //   const searchInput = screen.getByTestId(idSearchInput);
  //   const execSearchBtn = screen.getByTestId(idExecSearchBtn);
  //   const firstLetterSearchRadio = screen.getByTestId(idFirstLetterSearchRadio);

  //   userEvent.click(firstLetterSearchRadio);
  //   userEvent.type(searchInput, 'va');
  //   userEvent.click(execSearchBtn);
  // });
});
