import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import MyProvider from './context/myProvider';
import Login from './page/Login';
import Meals from './page/Meals';
import Drinks from './page/Drinks';
import Profile from './page/Profile';
import DoneRecipes from './page/DoneRecipes';
import FavoriteRecipes from './page/FavoriteRecipes';
import Meal from './page/Meal';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="/meals/:id-da-receita" component={ Meal } />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
