import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';

function Profile() {
  const history = useHistory();
  const userProfile = localStorage.getItem('user');
  if (!userProfile) localStorage.setItem('user', JSON.stringify({ email: '' }));
  const { email } = JSON.parse(localStorage.getItem('user'));

  const clearLocal = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" />
      Profile
      <Footer />
      <p data-testid="profile-email">{email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clearLocal }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
