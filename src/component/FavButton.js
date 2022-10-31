import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import HandleFavorites from '../services/useHandleFavorites';

function FavButton(props) {
  const [recipeName, setRecipeName] = useState('');
  const [showFavHeart, setShowFavHeart] = useState(false);
  const { location: { pathname } } = useHistory();
  const { recipe } = props;

  useEffect(() => {
    if (pathname.includes('meals')) {
      setRecipeName(recipe[0].strMeal);
    } else {
      setRecipeName(recipe[0].strDrink);
    }
    const heartStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (heartStorage !== null) {
      const storageBool = heartStorage.some((e) => e.name === recipeName);
      setShowFavHeart(storageBool);
    }
  }, [pathname, recipe, recipeName]);

  const handleFavorites = () => {
    setShowFavHeart(HandleFavorites(pathname, recipe));
  };

  return (
    showFavHeart ? (
      <button
        type="button"
        onClick={ handleFavorites }
      >
        <img
          data-testid="favorite-btn"
          src={ blackHeart }
          alt="Favoritado"
        />
      </button>
    ) : (
      <button
        type="button"
        onClick={ handleFavorites }
      >
        <img
          data-testid="favorite-btn"
          src={ whiteHeart }
          alt="Não favoritado"
        />
      </button>
    )
  );
}

FavButton.propTypes = {
  recipe: PropTypes.shape({}),
}.isRequired;

export default FavButton;
