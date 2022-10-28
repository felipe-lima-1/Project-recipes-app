import React from 'react';
import { useHistory } from 'react-router-dom';
import Meal from './Meal';
import Drink from './Drink';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();

  return (
    (pathname.includes('meals')) ? <Meal /> : <Drink />
  );
}

export default RecipeDetails;
