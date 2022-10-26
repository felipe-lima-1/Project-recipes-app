import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import fetchApiFilters from '../services/fetchApiFilters';
import filterCategory from '../services/filterCategory';
import fetchApiName from '../services/name';

function FilterButtons() {
  const { location: { pathname } } = useHistory();
  const [listBtn, setListBtn] = useState([]);
  const [isFiltered, setIsFiltered] = useState({
    name: '',
    toggle: false,
  });
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

  const cleanFilters = useCallback(async () => {
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
    setIsFiltered(!isFiltered);
  }, [isFiltered, pathname, setRecipes]);

  const handleClick = (search) => {
    let fetchApi;
    let filter;
    if (search !== isFiltered.name) {
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
      filter = {
        name: search,
        toggle: true,
      };
      setIsFiltered(filter);
      console.log(filter);
    } else {
      cleanFilters();
      filter = {
        name: search,
        toggle: false,
      };
      setIsFiltered(filter);
      console.log(filter);
    }
  };

  // useEffect(() => () => {
  //   if (isFiltered === false) {
  //     cleanFilters();
  //     console.log(isFiltered);
  //   }
  // }, [isFiltered, cleanFilters]);

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
