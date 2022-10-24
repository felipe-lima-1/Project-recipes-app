const fetchApiFirstLetter = async (search) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  const endpoint = `${url}${search}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.meals;
};

export default fetchApiFirstLetter;
