import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import fetchApiFilters from '../services/fetchApiFilters';
import filterCategory from '../services/filterCategory';
import fetchApiName from '../services/name';

function FilterButtons() {
  const { location: { pathname } } = useHistory();
  const [listBtn, setListBtn] = useState([]);
  const { setRecipes } = useContext(MyContext);
  const maxLength = 5;

  useEffect(() => {
    let fetchApi;
    if (pathname === '/meals') {
      fetchApi = async () => {
        const result = await fetchApiFilters('themealdb');
        setListBtn(result);
      };
    }
    if (pathname === '/drinks') {
      fetchApi = async () => {
        const result = await fetchApiFilters('thecocktaildb');
        setListBtn(result);
      };
    }
    fetchApi();
  }, [pathname, setListBtn]);

  const handleClick = (search) => {
    let fetchApi;
    if (pathname === '/meals') {
      fetchApi = async () => {
        const result = await filterCategory(search, 'themealdb');
        setRecipes(result);
      };
    }
    if (pathname === '/drinks') {
      fetchApi = async () => {
        const result = await filterCategory(search, 'thecocktaildb');
        setRecipes(result);
      };
    }
    fetchApi();
  };

  const cleanFilters = async () => {
    let fetchApi;
    if (pathname === '/meals') {
      fetchApi = async () => {
        const result = await fetchApiName('', 'themealdb');
        setRecipes(result);
      };
    }
    if (pathname === '/drinks') {
      fetchApi = async () => {
        const result = await fetchApiName('', 'thecocktaildb');
        setRecipes(result);
      };
    }
    fetchApi();
  };

  return (
    <div>
      { listBtn.length > 0
        && listBtn.map((btn, i) => (
          (i < maxLength) && (
            <button
              type="button"
              key={ btn.strCategory }
              data-testid={ `${btn.strCategory}-category-filter` }
              onClick={ () => handleClick(btn.strCategory) }
            >
              {btn.strCategory}
            </button>
          )
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ cleanFilters }
      >
        All
      </button>
    </div>
  );
}

export default FilterButtons;
