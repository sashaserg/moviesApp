/* library */
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

/* component */
import Header from './component/Header/Header.js'
import MainPage from './view/MainPage/MainPage.js'

/* style */
import './App.css';

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faKissBeam, faChevronDown } from '@fortawesome/free-solid-svg-icons'
library.add( faKissBeam, faChevronDown );


function App() {
  return (
    <Router>
          <Header/>
          <Switch>
            <Route exact path='/' component={ MainPage }/>
            <Route path='/home' component={ MainPage }/>
            {/* <Route component={NotFound}/> */}
          </Switch>
          {/* <DevTools /> */}
    </Router>
  );
}

export default App;
