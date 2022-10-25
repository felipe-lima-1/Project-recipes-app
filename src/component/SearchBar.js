import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchApiIngredient from '../services/ingredient';
import myContext from '../context/myContext';
import fetchApiName from '../services/name';
import fetchApiFirstLetter from '../services/firstLetter';

function SearchBar() {
  const [radioState, setRadioState] = useState('Ingredient');
  const [searchInput, setSearchInput] = useState('');
  const { recipes, setRecipes } = useContext(myContext);
  const { location: { pathname }, push } = useHistory();

  useEffect(() => {
    if (recipes !== null && recipes.length === 1) {
      if (Object.keys(recipes[0])[0] === 'idDrink') {
        push(`/drinks/${recipes[0].idDrink}`);
      } else push(`/meals/${recipes[0].idMeal}`);
    }
  }, [recipes, push]);

  const fetchMeal = async () => {
    const api = 'themealdb';
    if (radioState === 'Ingredient') {
      setRecipes(await fetchApiIngredient(searchInput, api));
    } else if (radioState === 'Name') {
      setRecipes(await fetchApiName(searchInput, api));
    } else if (searchInput.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setRecipes(await fetchApiFirstLetter(searchInput, api));
    }
  };

  const fetchCocktail = async () => {
    const api = 'thecocktaildb';
    if (radioState === 'Ingredient') {
      setRecipes(await fetchApiIngredient(searchInput, api));
    } else if (radioState === 'Name') {
      setRecipes(await fetchApiName(searchInput, api));
    } else if (searchInput.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setRecipes(await fetchApiFirstLetter(searchInput, api));
    }
  };

  const handleClick = async () => {
    if (pathname === '/meals') {
      await fetchMeal();
    } else {
      await fetchCocktail();
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar"
        value={ searchInput }
        onChange={ (e) => setSearchInput(e.target.value) }
      />
      <label htmlFor="ingredientSearchRadio">
        Ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchRadio"
          id="ingredientSearchRadio"
          value="Ingredient"
          defaultChecked
          onClick={ (e) => setRadioState(e.target.value) }
        />
      </label>
      <label htmlFor="nameSearchRadio">
        Nome
        <input
          type="radio"
          data-testid="name-search-radio"
          name="searchRadio"
          id="nameSearchRadio"
          value="Name"
          onClick={ (e) => setRadioState(e.target.value) }
        />
      </label>
      <label htmlFor="firstLetterSearchRadio">
        Primeira letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="searchRadio"
          id="firstLetterSearchRadio"
          value="First letter"
          onClick={ (e) => setRadioState(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
