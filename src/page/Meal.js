import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import Footer from '../component/Footer';
import fetchById from '../services/fetchById';
import fetchApiName from '../services/name';
import 'bootstrap/dist/css/bootstrap.min.css';

function Meal(props) {
  const [recipe, setRecipe] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const { match: { params: { id } } } = props;
  const maxLength = 6;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchById(id, 'themealdb');
      setRecipe(result);
      const response = await fetchApiName('', 'thecocktaildb');
      setRecommend(response);
    };
    fetchApi();
  }, [id, recipe, setRecipe]);

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

  const getYoutube = () => {
    const str1 = 'https://www.youtube.com/embed/';
    const str2 = recipe[0].strYoutube.split('watch?v=')[1];
    const video = `${str1}${str2}`;
    return video;
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
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ getYoutube() }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
         encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <Carousel
          variant="carouselExampleControls"
        >
          <div className="carousel-inner">
            { (recommend.length > 0) && recommend.map((e, i) => i < maxLength

        && (
          i === 0 ? (
            <div
              className="carousel-item active"
              data-testid={ `${i}-recommendation-card` }
              key={ e.strDrink }
            >
              <img src={ e.strDrinkThumb } className="d-block w-100" alt={ e.strDrink } />
            </div>
          ) : (
            <div
              className="carousel-item"
              data-testid={ `${i}-recommendation-card` }
              key={ e.strDrink }
            >
              <img src={ e.strDrinkThumb } className="d-block w-100" alt={ e.strDrink } />
            </div>
          )

        )) }
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </Carousel>
        <Footer />
      </div>
    )
  );
}

Meal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Meal;
