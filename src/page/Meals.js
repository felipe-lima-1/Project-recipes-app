import React, { useContext, useEffect } from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import myContext from '../context/myContext';
import fetchApiName from '../services/name';
import Recipes from '../component/Recipes';
import FilterButtons from '../component/FilterButtons';

function Meals() {
  const { recipes, setRecipes } = useContext(myContext);
  const maxLength = 12;
  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchApiName('', 'themealdb');
      setRecipes(result);
    };
    fetchApi();
  }, [setRecipes]);

  return (
    <div>
      <Header title="Meals" />
      <FilterButtons />
      { recipes === null
        ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
        : recipes.map((recipe, i) => (i < maxLength)
        && (
          <section key={ recipe.idMeal } data-testid={ `${i}-recipe-card` }>
            <Recipes
              recipe={ recipe }
              index={ i }
            />
          </section>
        ))}
      Meals
      <Footer />
    </div>
  );
}

export default Meals;
