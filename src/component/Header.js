import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

function Header(props) {
  const { title } = props;
  const { location: { pathname }, push } = useHistory();

  const renderIcon = () => {
    if (
      pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes'
    ) {
      return (
        null
      );
    } return (<img
      src={ searchImg }
      alt="icone de pesquisa"
      data-testid="search-top-btn"
    />);
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
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
