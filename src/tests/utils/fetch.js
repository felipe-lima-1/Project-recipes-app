const meals = require('../../../cypress/mocks/meals');
const oneMeal = require('../../../cypress/mocks/oneMeal');
const chickenMeals = require('../../../cypress/mocks/chickenMeals');
const mealIngredients = require('../../../cypress/mocks/mealIngredients');
const mealsByIngredient = require('../../../cypress/mocks/mealsByIngredient');
const drinks = require('../../../cypress/mocks/drinks');
const oneDrink = require('../../../cypress/mocks/oneDrink');
const drinkIngredients = require('../../../cypress/mocks/drinkIngredients');
const drinksByIngredient = require('../../../cypress/mocks/drinksByIngredient');

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(mealIngredients); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') { return Promise.resolve(mealsByIngredient); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(drinkIngredients); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') { return Promise.resolve(drinksByIngredient); }

    if (
      url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
      || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
      || url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=a'
      || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977'
    ) { return Promise.resolve(oneMeal); }

    if (
      url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
    ) { return Promise.resolve(oneDrink); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') { return Promise.resolve(chickenMeals); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v') { return Promise.resolve(drinks); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(meals); }

    return Promise.reject(new Error('Invalid url'));
  },
});

module.exports = fetch;
