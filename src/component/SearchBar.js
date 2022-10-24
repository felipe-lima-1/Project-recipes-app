import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchApiIngredient from '../services/ingredient';
import myContext from '../context/myContext';
import fetchApiName from '../services/name';
import fetchApiFirstLetter from '../services/firstLetter';

function SearchBar() {
  const [radioState, setRadioState] = useState('Ingredient');
  const [searchInput, setSearchInput] = useState('');
  const { ingredients, setIngredients } = useContext(myContext);
  const { location: { pathname }, push } = useHistory();

  useEffect(() => {
    if (ingredients.length === 1) {
      if (Object.keys(ingredients[0])[0] === 'idDrink') {
        push(`/drinks/${ingredients[0].idDrink}`);
      } else push(`/meals/${ingredients[0].idMeal}`);
    }
  }, [ingredients, push]);

  const fetchMeal = async () => {
    const api = 'themealdb';
    if (radioState === 'Ingredient') {
      setIngredients(await fetchApiIngredient(searchInput, api));
    } else if (radioState === 'Name') {
      setIngredients(await fetchApiName(searchInput, api));
    } else if (radioState === 'First letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        setIngredients(await fetchApiFirstLetter(searchInput, api));
      }
    }
  };

  const fetchCocktail = async () => {
    console.log('foi');
    const api = 'thecocktaildb';
    if (radioState === 'Ingredient') {
      setIngredients(await fetchApiIngredient(searchInput, api));
    } else if (radioState === 'Name') {
      setIngredients(await fetchApiName(searchInput, api));
    } else if (radioState === 'First letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        setIngredients(await fetchApiFirstLetter(searchInput, api));
      }
    }
  };

  const handleClick = async () => {
    if (pathname === '/meals') {
      await fetchMeal();
    } else if (pathname === '/drinks') {
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
