import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './components/Landing';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}
from "react-router-dom";
import ManagerViewContainer from './components/manager/ManagerViewContainer';
import UserViewContainer from './components/user/UserViewContainer';
import HomeView from './components/home/HomeView';
import TopNav from './components/TopNav';

function App() {
  return (
    <Router>
    
    
    <div className="App">
        <TopNav/>
        <Switch>
          <Route path="/manager">
            <ManagerViewContainer />
          </Route>
          <Route path="/user">
            <UserViewContainer />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>

    </div>
      </Router>
  );
}

export default App;
