const fetchApiFirstLetter = async (search, api) => {
  const endpoint = `https://www.${api}.com/api/json/v1/1/search.php?f=${search}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  if (api === 'themealdb') {
    return data.meals;
  }
  return data.drinks;
};

export default fetchApiFirstLetter;
