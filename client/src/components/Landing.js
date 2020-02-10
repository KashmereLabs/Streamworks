import React, { Component } from 'react';
import { Container, Grid, Row, Col, Button } from 'react-bootstrap';
import { createDfuseClient } from '@dfuse/client';
import LoginPage from './LoginPage';
import UserViewContainer from './user/UserViewContainer';
import AppHome from './AppHome';
import Web3 from 'web3';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { 'currentView': '' };
  }

  componentWillMount() {

    const web3 = window.web3;

    if (!web3) {
      this.setState({ 'currentView': 'login' });
    }
    else {

      this.setState({ 'currentView': 'home' });
    }

    window.addEventListener('load', async() => {
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();

        }
        catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
      }

      // Non-dapp browsers...
      else {
        this.setState({ 'currentView': 'login' });

      }
    });
  }
  render() {
    let currentViewPage = <span/>;
    if (this.state.currentView === 'home') {
      currentViewPage = <AppHome/>;
    }
    if (this.state.currentView === 'login') {
      currentViewPage = <LoginPage/>;
    }
    return (
      <div>
  
      <Container>
        {currentViewPage}
      </Container>
      </div>
    )
  }
}
