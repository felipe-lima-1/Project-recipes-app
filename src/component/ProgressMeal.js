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
      const result = await fetchById(id, 'themealdb');
      setRecipe(result);
      setRecipeName(result[0].strMeal);
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

  return (
    recipe.length > 0 && (
      <div>
        <img
          src={ recipe[0].strMealThumb }
          alt={ recipe[0].strMeal }
          data-testid="recipe-photo"
        />
        <p
          data-testid="recipe-title"
        >
          {recipe[0].strMeal}
        </p>
        <p
          data-testid="recipe-category"
        >
          {recipe[0].strCategory}
        </p>
        {getIngredients().map((ingredient, i) => (
          <p
            key={ ingredient }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {ingredient}
            {' '}
            {getMeasure()[i]}
          </p>
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
