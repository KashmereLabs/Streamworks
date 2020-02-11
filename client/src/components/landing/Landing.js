import React, { Component } from 'react';
import { Container, Grid, Row, Col, Button } from 'react-bootstrap';
import { createDfuseClient } from '@dfuse/client';
import LoginPage from './LoginPage';


import Web3 from 'web3';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { 'currentView': '' };
  }

  componentWillMount() {

    const web3 = window.web3;
    const self = this;
    if (!web3) {
      this.setState({ 'currentView': 'login' });
    }
    else {

      this.setState({ 'currentView': 'home' });
    }

    window.addEventListener('load', async() => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();

        }
        catch (error) {
          this.setState({ 'currentView': 'login' });
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
    

    if (web3 && web3.utils) {
      let walletAddress = window.ethereum.selectedAddress;
      web3.eth.getBalance(walletAddress, function(error, result) {

        if (error) {
          // Do nothing
        }
        else {
          let balance = web3.utils.fromWei(result, 'ether');
          let walletBalance = balance;
       //   self.props.setUserWallet({'address': walletAddress, balance: balance});
        }
      })
    }
    
  }
  render() {
    let currentViewPage = <span/>;
    if (this.state.currentView === 'home') {
      currentViewPage = this.props.children;
    }
    if (this.state.currentView === 'login') {
      currentViewPage = <LoginPage/>;
    }
    return (
      <div>
        {currentViewPage}
      </div>
    )
  }
}
