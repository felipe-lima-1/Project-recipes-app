import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import FavButton from './FavButton';
import shareIcon from '../images/shareIcon.svg';
import fetchById from '../services/fetchById';

function ProgressMeal() {
  const [recipe, setRecipe] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchById(id, 'thecocktaildb');
      setRecipe(result);
      setRecipeName(result[0].strDrink);
    };
    fetchApi();
  }, [id, setRecipe, setRecipeName]);

  const getIngredients = () => {
    if (recipe.length > 0) {
      const Ingredients = Object.entries(recipe[0])
        .filter((e) => e[0].includes('strIngredient') && e[1] !== '' && e[1] !== null)
        .map((e) => e[1]);
      return Ingredients;
    }
  };

  const getMeasure = () => {
    if (recipe.length > 0) {
      const measure = Object.entries(recipe[0])
        .filter((e) => e[0].includes('strMeasure') && e[1] !== '' && e[1] !== null)
        .map((e) => e[1]);
      return measure;
    }
  };

  const handleShare = () => {
    clipboard(`http://localhost:3000${pathname}`);
    setShowCopyMsg(true);
  };

  const handleCheck = ({ target }) => {
    if (target.checked === true) {
      target.parentElement.className = 'ingredient';
    } else {
      target.parentElement.className = '';
    }
  };

  return (
    recipe.length > 0 && (
      <div>
        <img
          src={ recipe[0].strDrinkThumb }
          alt={ recipe[0].strDrink }
          data-testid="recipe-photo"
        />
        <p
          data-testid="recipe-title"
        >
          {recipe[0].strDrink}
        </p>
        <p
          data-testid="recipe-category"
        >
          {recipe[0].strCategory}
          {recipe[0].strAlcoholic}
        </p>
        {getIngredients().map((ingredient, i) => (
          <label
            key={ ingredient }
            data-testid={ `${i}-ingredient-step` }
            htmlFor={ `${i}ingredient` }
          >
            {ingredient}
            {' '}
            {getMeasure()[i]}
            <input
              type="checkbox"
              id={ `${i}ingredient` }
              onClick={ (e) => handleCheck(e) }
            />
          </label>
        ))}
        <p data-testid="instructions">
          {recipe[0].strInstructions}
        </p>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShare }
        >
          <img
            src={ shareIcon }
            alt="Compartilhar"
          />
        </button>
        {showCopyMsg && <span>Link copied!</span>}
        <FavButton recipe={ recipe } />
        <button
          type="button"
          data-testid="finish-recipe-btn"

        >
          Finalizar
        </button>
      </div>
    ));
}

export default ProgressMeal;
