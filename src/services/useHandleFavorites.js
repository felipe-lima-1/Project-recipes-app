const HandleFavorites = (pathname, recipe) => {
  let recipeName;
  if (pathname.includes('meals')) {
    recipeName = recipe[0].strMeal;
  } else {
    recipeName = recipe[0].strDrink;
  }
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let obj;
  let boolReturn;
  if (pathname.includes('meals')) {
    obj = {
      id: recipe[0].idMeal,
      type: 'meal',
      nationality: recipe[0].strArea,
      category: recipe[0].strCategory,
      alcoholicOrNot: '',
      name: recipe[0].strMeal,
      image: recipe[0].strMealThumb,
    };
  } else {
    obj = {
      id: recipe[0].idDrink,
      type: 'drink',
      nationality: '',
      category: recipe[0].strCategory,
      alcoholicOrNot: recipe[0].strAlcoholic,
      name: recipe[0].strDrink,
      image: recipe[0].strDrinkThumb,
    };
  }
  let arr = [];
  if (storage !== null) {
    if (storage.some((e) => e.name === recipeName)) {
      arr = storage.filter((e) => (
        e.name !== recipeName));
      boolReturn = false;
    } else {
      arr = [...storage, obj];
      boolReturn = true;
    }
  } else {
    arr = [obj];
    boolReturn = true;
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
  return boolReturn;
};

export default HandleFavorites;
