import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const storageLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storageLocal !== null) {
      setStorage(storageLocal);
    }
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {storage.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
          </span>
          <span data-testid={ `${index}-horizontal-name` }>{recipe.name}</span>
          <span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            Share
          </button>
          {recipe.tags !== null && (
            recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
