import PropTypes from 'prop-types';
import React from 'react';

function Recipes(props) {
  const { recipe, index } = props;

  const renderCard = () => {
    if (recipe.idDrink) {
      return (
        <div>
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <span data-testid={ `${index}-card-name` }>
            { recipe.strDrink }
          </span>
        </div>
      );
    }
    return (
      <div>
        <img
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>
          { recipe.strMeal }
        </span>
      </div>
    );
  };

  return (
    renderCard()
  );
}

Recipes.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;

export default Recipes;
