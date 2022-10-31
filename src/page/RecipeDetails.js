import React from 'react';
import { useHistory } from 'react-router-dom';
import Meal from '../component/Meal';
import Drink from '../component/Drink';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();

  return (
    (pathname.includes('meals')) ? <Meal /> : <Drink />
  );
}

export default RecipeDetails;
