import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import MyContext from './myContext';

function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const INITIAL_STATE = useMemo(() => ({
    email,
    password,
    setEmail,
    setPassword,
    ingredients,
    setIngredients,
  }), [
    email,
    password,
    setEmail,
    setPassword,
    ingredients,
    setIngredients,
  ]);

  return (
    <MyContext.Provider value={ INITIAL_STATE }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.shape({}),
}.isRequired;

export default MyProvider;
