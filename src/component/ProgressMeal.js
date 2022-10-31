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
    drinks: {},
    meals: {
      [id]: [],
    },
  });
  const { location: { pathname }, push } = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchById(id, 'themealdb');
      setRecipe(result);
    };
    fetchApi();
    const storageLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageLocal !== null) {
      if (storageLocal.meals) {
        setStorage(storageLocal);
      } else {
        const obj = {
          ...storageLocal,
          meals: {
            [id]: [],
          },
        };
        setStorage(obj);
      }
    } else {
      const obj = {
        ...storageLocal,
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
    clipboard(`http://localhost:3000${pathname.split('/in')[0]}`);
    setShowCopyMsg(true);
  };

  const handleCheck = ({ target }) => {
    let arr = storage.meals[id];
    if (target.checked === true) {
      target.parentElement.className = 'ingredient';
      arr.push(target.className);
    } else {
      target.parentElement.className = '';
      arr = storage.meals[id].filter((e) => e !== target.className);
    }
    const obj = {
      ...storage,
      meals: {
        [id]: arr,
      },
    };
    setStorage(obj);
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  };

  const handleBtn = () => {
    let arr = [];
    if (recipe[0].strTags !== null) {
      arr = recipe[0].strTags.split(',');
    }
    const obj = {
      id,
      nationality: recipe[0].strArea,
      name: recipe[0].strMeal,
      category: recipe[0].strCategory,
      image: recipe[0].strMealThumb,
      tags: arr,
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: new Date().toISOString(),
    };
    const storageLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storageLocal !== null) {
      localStorage.setItem('doneRecipes', JSON.stringify([
        ...storageLocal,
        obj,
      ]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([
        obj,
      ]));
    }
    push('/done-recipes');
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
          <label
            key={ ingredient }
            className={ storage.meals[id].some(
              (e) => e === ingredient,
            ) ? 'ingredient' : '' }
            data-testid={ `${i}-ingredient-step` }
            htmlFor={ `${i}ingredient` }
          >
            {ingredient}
            {' '}
            {getMeasure()[i]}
            <input
              className={ ingredient }
              checked={ storage.meals[id].some((e) => e === ingredient) }
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
          disabled={ storage.meals[id].length !== getIngredients().length }
          onClick={ handleBtn }
        >
          Finish Recipe
        </button>
      </div>
    ));
}

export default ProgressMeal;
