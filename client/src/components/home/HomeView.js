import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Container, Tabs, Tab } from 'react-bootstrap';
import { getAccountDetails } from '../../utils/Web3Utils';
import { getWeb3Authentication } from '../../utils/Web3Utils';
import './home.css';

export default class HomeView extends Component {
  componentWillMount() {
    getWeb3Authentication();
    this.props.getWalletHistory();
    this.props.getUserInfo();
  }
  render() {
    const { user: { walletHistory } } = this.props;
    let accountDetails = getAccountDetails();
    console.log(accountDetails);
    let transactionList = <span/>;
    if (walletHistory.length > 0) {
      transactionList = walletHistory.map(function(data) {
        let dataNode = data.node;
        return <ListGroupItem>
        <Row>
          <Col lg={2}>
            <div className="address-block">{dataNode.to}</div>
          </Col>
          <Col lg={2}>{dataNode.value}</Col>
          <Col lg={2}>{dataNode.flatCalls[0].balanceChanges.map(function(item){
            return <div>{item.reason}</div>
          })}</Col>
        </Row>
        </ListGroupItem>
      })
    }
    return (
      <Container>
        <div className="top-info-container">
          <Row>
          <Col lg={6}>
            <div className="left-label-container">
              <div>Address</div> 
            </div>
          </Col>
          <Col lg={6}>
            <div className="left-label-container">Account ethereum balance </div>
          </Col>
          </Row>
          <Row>
          <Col lg={12}>
            <div className="left-label-container">
              Invoices Created
            </div>
          </Col>
          <Row>
          </Row>
          <Col lg={12}>
            <div className="left-label-container">
              Invoices Received
            </div>
          </Col>
          </Row>
          </div>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="from" title="Incoming">
              <ListGroup>
                {transactionList}
              </ListGroup>
            </Tab>
            <Tab eventKey="to" title="Outgoing">
              <ListGroup>
                {transactionList}
              </ListGroup>
            </Tab>
        </Tabs>  
  
      </Container>

    )
  }
}
