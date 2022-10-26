import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Recipes from '../component/Recipes';
import myContext from '../context/myContext';
import Footer from '../component/Footer';
import fetchApiName from '../services/name';
import FilterButtons from '../component/FilterButtons';

function Drinks() {
  const { recipes, setRecipes } = useContext(myContext);
  const maxLength = 12;
  useEffect(() => {
    const fetchApi = async () => {
      setRecipes(await fetchApiName('', 'thecocktaildb'));
    };
    fetchApi();
  }, [setRecipes]);

  return (
    <div>
      <Header title="Drinks" />
      <FilterButtons />
      {
        recipes === null
          ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
          : recipes.map((recipe, i) => (i < maxLength)
        && (
          <Link
            to={ `/drinks/${recipe.idDrink}` }
            key={ recipe.idDrink }
            data-testid={ `${i}-recipe-card` }
          >
            <Recipes
              recipe={ recipe }
              index={ i }
            />
          </Link>))
      }
      Drinks
      <Footer />
    </div>
  );
}

export default Drinks;
