import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './myContext';

const INITIAL_STATE = {};

function MyProvider({ children }) {
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
