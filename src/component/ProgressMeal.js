import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import FavButton from './FavButton';
import shareIcon from '../images/shareIcon.svg';
import fetchById from '../services/fetchById';

function ProgressMeal() {
  const [recipe, setRecipe] = useState([]);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const [flag, setFlag] = useState('');
  const { id } = useParams();
  const [storage, setStorage] = useState({
    drinks: {},
    meals: {
      [id]: [],
    },
  });
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchById(id, 'themealdb');
      setRecipe(result);
    };
    fetchApi();
    const storageLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageLocal !== null) {
      setStorage(storageLocal);
    } else {
      const obj = {
        drinks: {},
        meals: {
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
    clipboard(`http://localhost:3000${pathname}`);
    setShowCopyMsg(true);
  };

  // const checkStorage = (target) => storage.meals[id]
  //   .some((e) => e === target.parentElement.value);

  const handleCheck = ({ target }) => {
    setFlag(target.className);
    if (target.checked === true) {
      target.parentElement.className = 'ingredient';
    } else {
      target.parentElement.className = '';
    }
  };

  useEffect(() => {
    if (flag !== '') {
      let arr = storage.meals[id];
      if (!storage.meals[id]
        .some((e) => e === flag)) {
        arr.push(flag);
      } else {
        console.log(storage.meals[id]);
        console.log(flag);
        arr = storage.meals[id].filter((e) => e !== flag);
      }
      const obj = {
        ...storage,
        meals: {
          [id]: arr,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  }, [flag, id, storage]);

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
          <label
            key={ ingredient }
            data-testid={ `${i}-ingredient-step` }
            htmlFor={ `${i}ingredient` }
          >
            {ingredient}
            {' '}
            {getMeasure()[i]}
            <input
              className={ ingredient }
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
