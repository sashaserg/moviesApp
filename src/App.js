/* library */
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

/* component */
import DevTools from 'mobx-react-devtools'
import Header from './component/Header/Header.js';
import MainPage from './view/MainPage/MainPage.js';
import MovieDetailsPage from './view/MovieDetailsPage/MovieDetailsPage.js';
import FavoritePage from './view/FavoritePage/FavoritePage.js';

/* style */
import './App.css';

/* store */
import MovieStore from './store/MovieStore/MovieStore.js';

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faKissBeam, faChevronDown, faArrowAltCircleLeft, faArrowAltCircleRight, faStar } from '@fortawesome/free-solid-svg-icons'
library.add( faKissBeam, faChevronDown, faArrowAltCircleLeft, faArrowAltCircleRight, faStar );

function App() {
  return (
    <Router>
          <Header/>
          <Switch>
            <Route exact path='/' component={ MainPage }/>
            <Route path='/home' component={ MainPage }/>
            <Route path='/favorite' component={ FavoritePage }/>
          </Switch>
          <DevTools />
    </Router>
  );
}

export default App;
