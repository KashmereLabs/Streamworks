import React from 'react';
import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}
from "react-router-dom";
import ManagerViewContainer from './components/manager/ManagerViewContainer';
import UserViewContainer from './components/user/UserViewContainer';
import HomeViewContainer from './components/home/HomeViewContainer';
import TopNav from './components/nav/TopNav';
import Landing from './components/landing/Landing';

function App() {
  return (
    <Router>
    <div className="App">
        <TopNav/>
        <Landing>
        <Switch>
          <Route path="/manager">
            <ManagerViewContainer />
          </Route>
          <Route path="/user">
            <UserViewContainer />
          </Route>
          <Route path="/">
            <HomeViewContainer />
          </Route>
        </Switch>
        </Landing>
      </div>
    </Router>
  );
}

export default App;
