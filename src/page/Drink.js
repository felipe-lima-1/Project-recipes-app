import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import Footer from '../component/Footer';
import fetchById from '../services/fetchById';
import fetchApiName from '../services/name';
import StartRecipeBtn from '../component/StartRecipeBtn';
import 'bootstrap/dist/css/bootstrap.min.css';

function Drink(props) {
  const [recipe, setRecipe] = useState({});
  const [recipeName, setRecipeName] = useState('');
  const [recommend, setRecommend] = useState([]);
  const [showDoneBtn, setShowDoneBtn] = useState(false);
  const { match: { params: { id } } } = props;
  const maxLength = 5;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchById(id, 'thecocktaildb');
      setRecipe(result);
      setRecipeName(result[0].strDrink);
      const response = await fetchApiName('', 'themealdb');
      const arr = [];
      for (let i = 0; i <= maxLength; i += 2) {
        arr.push({
          meal1: {
            img: response[i].strMealThumb,
            name: response[i].strMeal,
            index: i,
          },
          meal2: {
            img: response[i + 1].strMealThumb,
            name: response[i + 1].strMeal,
            index: i + 1,
          },
        });
      }
      setRecommend(arr);
    };
    fetchApi();
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage !== null) {
      setShowDoneBtn(storage.some((e) => e.name === recipeName));
    }
  }, [id, recipeName, setRecipe]);

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
        <Carousel activeIndex={ index } onSelect={ handleSelect }>
          {
            recommend.map((elem, i) => (
              <Carousel.Item
                key={ i }
              >
                <img
                  className="d-inline w-50 h-50"
                  data-testid={ `${elem.meal1.index}-recommendation-card` }
                  src={ elem.meal1.img }
                  alt={ elem.meal1.name }
                />
                <img
                  className="d-inline w-50 h-50"
                  data-testid={ `${elem.meal2.index}-recommendation-card` }
                  src={ elem.meal2.img }
                  alt={ elem.meal2.name }
                />
                <Carousel.Caption>
                  <p
                    data-testid={ `${elem.meal1.index}-recommendation-title` }
                  >
                    { elem.meal1.name }

                  </p>
                  <p
                    data-testid={ `${elem.meal2.index}-recommendation-title` }
                  >
                    { elem.meal2.name }

                  </p>
                </Carousel.Caption>
              </Carousel.Item>

            ))
          }
        </Carousel>
        {!showDoneBtn
        && <StartRecipeBtn recipeId={ recipe[0].idDrink } />}
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
