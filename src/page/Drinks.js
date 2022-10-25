import React, { useContext } from 'react';
import Header from '../component/Header';
import Recipes from '../component/Recipes';
import myContext from '../context/myContext';

function Drinks() {
  const { recipes } = useContext(myContext);
  const maxLength = 12;

  return (
    <div>
      <Header title="Drinks" />
      {
        recipes === null
          ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
          : recipes.map((recipe, i) => (i < maxLength)
        && (
          <section data-testid={ `${i}-recipe-card` }>
            <Recipes
              recipe={ recipe }
              index={ i }
              key={ recipe.idDrink }
            />
          </section>))
      }
    </div>
  );
}

export default Drinks;
