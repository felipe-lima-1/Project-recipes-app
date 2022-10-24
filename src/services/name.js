const fetchApiName = async (search) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const endpoint = `${url}${search}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.meals;
};

export default fetchApiName;
