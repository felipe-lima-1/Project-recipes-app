import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

function Header(props) {
  const [searchInput, setSearchInput] = useState(false);

  const { title } = props;
  const { location: { pathname }, push } = useHistory();

  const handleSearch = () => {
    setSearchInput(!searchInput);
    console.log(searchInput);
  };

  const renderIcon = () => {
    if (
      pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes'
    ) {
      return (
        null
      );
    } return (
      <button
        type="button"
        onClick={ handleSearch }
      >
        <img
          src={ searchImg }
          alt="icone de pesquisa"
          data-testid="search-top-btn"
        />
      </button>
    );
  };

  return (
    <header>
      <button
        type="button"
        onClick={ () => push('/profile') }
      >
        <img
          src={ profileImg }
          alt="imagem de perfil"
          data-testid="profile-top-btn"
        />
      </button>
      { renderIcon() }
      {searchInput
      && <input type="text" data-testid="search-input" placeholder="Buscar" />}
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
