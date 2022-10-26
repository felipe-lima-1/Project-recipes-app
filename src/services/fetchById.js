const fetchById = async (id, api) => {
  const endpoint = `https://www.${api}.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  if (api === 'themealdb') {
    return data.meals;
  }
  return data.drinks;
};

export default fetchById;
