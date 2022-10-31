import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import FavButton from './FavButton';
import shareIcon from '../images/shareIcon.svg';
import fetchById from '../services/fetchById';

function ProgressMeal() {
  const [recipe, setRecipe] = useState([]);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const { id } = useParams();
  const [storage, setStorage] = useState({
    drinks: {
      [id]: [],
    },
    meals: {},
  });
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchById(id, 'thecocktaildb');
      setRecipe(result);
    };
    fetchApi();
    const storageLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageLocal !== null) {
      if (storageLocal.drinks) {
        setStorage(storageLocal);
      } else {
        const obj = {
          ...storageLocal,
          drinks: {
            [id]: [],
          },
        };
        setStorage(obj);
      }
    } else {
      const obj = {
        ...storageLocal,
        drinks: {
          [id]: [],
        },
      };
      setStorage(obj);
    }
  }, [id]);

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
    clipboard(`http://localhost:3000${pathname.split('/in')[0]}`);
    setShowCopyMsg(true);
  };

  const handleCheck = ({ target }) => {
    let arr = storage.drinks[id];
    if (target.checked === true) {
      target.parentElement.className = 'ingredient';
      arr.push(target.className);
    } else {
      target.parentElement.className = '';
      arr = storage.drinks[id].filter((e) => e !== target.className);
    }
    const obj = {
      ...storage,
      drinks: {
        [id]: arr,
      },
    };
    setStorage(obj);
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
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
            className={ storage.drinks[id].some((e) => e === ingredient) && 'ingredient' }
            data-testid={ `${i}-ingredient-step` }
            htmlFor={ `${i}ingredient` }
          >
            {ingredient}
            {' '}
            {getMeasure()[i]}
            <input
              className={ ingredient }
              checked={ storage.drinks[id].some((e) => e === ingredient) }
              type="checkbox"
              id={ `${i}ingredient` }
              onChange={ (e) => handleCheck(e) }
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
