import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function StartRecipeBtn(props) {
  const { recipeId } = props;
  const [inProgressBtn, setInProgressBtn] = useState(false);
  const { location: { pathname }, push } = useHistory();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (storage !== null) {
      if (pathname.includes('meals')) {
        setInProgressBtn(Object.keys(storage.meals).some((e) => e === recipeId));
      } else {
        setInProgressBtn(Object.keys(storage.drinks).some((e) => e === recipeId));
      }
    }
  }, [inProgressBtn, pathname, recipeId]);

  return (
    inProgressBtn
      ? (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => push(`${pathname}/in-progress`) }
        >
          Continue Recipe
        </button>
      ) : (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => push(`${pathname}/in-progress`) }
        >
          Start Recipe
        </button>
      )
  );
}

StartRecipeBtn.propTypes = {
  recipeName: PropTypes.string,
}.isRequired;

export default StartRecipeBtn;
