import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboard from 'clipboard-copy';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchById from '../services/fetchById';
import fetchApiName from '../services/name';
import StartRecipeBtn from '../component/StartRecipeBtn';
import shareIcon from '../images/shareIcon.svg';
import FavButton from '../component/FavButton';

function Meal(props) {
  const [recipe, setRecipe] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [recommend, setRecommend] = useState([]);
  const [showDoneBtn, setShowDoneBtn] = useState(false);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const { match: { params: { id } } } = props;
  const maxLength = 5;
  const [index, setIndex] = useState(0);
  const { location: { pathname } } = useHistory();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchById(id, 'themealdb');
      setRecipe(result);
      setRecipeName(result[0].strMeal);
      const response = await fetchApiName('', 'thecocktaildb');
      const arr = [];
      for (let i = 0; i <= maxLength; i += 2) {
        arr.push({
          drink1: {
            img: response[i].strDrinkThumb,
            name: response[i].strDrink,
            index: i,
          },
          drink2: {
            img: response[i + 1].strDrinkThumb,
            name: response[i + 1].strDrink,
            index: i + 1,
          },
        });
      }
      setRecommend(arr);
    };
    fetchApi();
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage !== null) {
      const storageBool = storage.some((e) => e.name === recipeName);
      setShowDoneBtn(storageBool);
    }
  }, [id, recipeName, setRecipe, showDoneBtn]);

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
        <Carousel activeIndex={ index } onSelect={ handleSelect }>
          {
            recommend.map((elem, i) => (
              <Carousel.Item
                key={ i }
              >
                <img
                  className="d-inline w-50 h-50"
                  data-testid={ `${elem.drink1.index}-recommendation-card` }
                  src={ elem.drink1.img }
                  alt={ elem.drink1.name }
                />
                <img
                  className="d-inline w-50 h-50"
                  data-testid={ `${elem.drink2.index}-recommendation-card` }
                  src={ elem.drink2.img }
                  alt={ elem.drink2.name }
                />
                <Carousel.Caption>
                  <p
                    data-testid={ `${elem.drink1.index}-recommendation-title` }
                  >
                    { elem.drink1.name }

                  </p>
                  <p
                    data-testid={ `${elem.drink2.index}-recommendation-title` }
                  >
                    { elem.drink2.name }

                  </p>
                </Carousel.Caption>
              </Carousel.Item>

            ))
          }
        </Carousel>
        {!showDoneBtn && <StartRecipeBtn recipeId={ recipe[0].idMeal } />}
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
