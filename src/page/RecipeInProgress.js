import React from 'react';
import { useHistory } from 'react-router-dom';
import ProgressDrink from '../component/ProgressDrink';
import ProgressMeal from '../component/ProgressMeal';

function RecipeInProgress() {
  const { location: { pathname } } = useHistory();

  return (
    (pathname.includes('meals')) ? <ProgressMeal /> : <ProgressDrink />
  );
}

export default RecipeInProgress;
