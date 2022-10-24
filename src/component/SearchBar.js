import React, { useContext, useState } from 'react';
import fetchApiIngredient from '../services/ingredient';
import myContext from '../context/myContext';
import fetchApiName from '../services/name';
import fetchApiFirstLetter from '../services/firstLetter';

function SearchBar() {
  const [radioState, setRadioState] = useState('Ingredient');
  const [searchInput, setSearchInput] = useState('');
  const { setIngredients } = useContext(myContext);

  const handleClick = async () => {
    if (radioState === 'Ingredient') {
      setIngredients(await fetchApiIngredient(searchInput));
    } else if (radioState === 'Name') {
      setIngredients(await fetchApiName(searchInput));
    } else if (radioState === 'First letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else { setIngredients(await fetchApiFirstLetter(searchInput)); }
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
