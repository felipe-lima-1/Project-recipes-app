import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../component/Footer';
import fetchById from '../services/fetchById';
import fetchApiName from '../services/name';

function Drink(props) {
  const [recipe, setRecipe] = useState({});
  const [recommend, setRecommend] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchById(id, 'thecocktaildb');
      setRecipe(result);
      const response = await fetchApiName('', 'themealdb');
      setRecommend(response);
    };
    fetchApi();
  }, [id, setRecipe]);

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
        {console.log(recommend)}
        <Footer />
      </div>
    )
  );
}

Drink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Drink;
