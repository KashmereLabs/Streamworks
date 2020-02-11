import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Container, Tabs, Tab } from 'react-bootstrap';
import { getAccountDetails } from '../../utils/Web3Utils';
import { getWeb3Authentication } from '../../utils/Web3Utils';
import './home.css';
import * as moment from 'moment';

export default class HomeView extends Component {
  componentWillMount() {
    getWeb3Authentication();
    this.props.getWalletHistory("to");
    this.props.getUserInfo();
  }

  componentDidMount() {

  }

  homeTabToggle = (toggle) => {
    this.props.getWalletHistory(toggle);
  }
  render() {
    const { user: { walletHistory, userInfo } } = this.props;
    let walletBalance = "-";

    let numOfInvoicesSent = 0;
    let numOfInvoicesReceived = 0;
    let numOfInvoicesSentPaid = 0;
    let numOfInvoicesReceivedPaid = 0;
    const walletAddress = window.ethereum.selectedAddress;

    if (userInfo) {
      userInfo.forEach(function(infoItem) {
        if (infoItem.sender_address.toLowerCase() === walletAddress) {
          numOfInvoicesSent++;
          if (infoItem.status === 'paid') {
            numOfInvoicesSentPaid++;
          }
        }
        if (infoItem.recipient_address.toLowerCase() === walletAddress) {
          numOfInvoicesReceived++;
          if (infoItem.status === 'paid') {
            numOfInvoicesReceivedPaid++;
          }
        }
      })
    }

    let transactionList = <span/>;
    if (walletHistory.length > 0) {
      transactionList = walletHistory.map(function(data) {


        let dataNode = data.node;

        let txNodeData = userInfo.find(function(a) {
          if (a && a.transaction_hash) {
            return a.transaction_hash.toLowerCase() === dataNode.hash.toLowerCase();
          }
        });

        let txLabel = "";
        let txDescription = "";

        if (txNodeData) {
          txLabel = txNodeData.label;
          txDescription = txNodeData.description;
        }
        let dateString = "";
        if (dataNode.block.header.timestamp) {
          dateString = moment(parseInt(dataNode.block.header.timestamp, 10)).format("L");
          console.log(dateString);
        }
        let toAddress = dataNode.to.substr(0, 5) + "...." + dataNode.to.substr(dataNode.to.length - 6, dataNode.to.length - 1)
        let txHash = dataNode.hash.substr(0, 5) + "...." + dataNode.to.substr(dataNode.to.length - 6, dataNode.to.length - 1);
        return <ListGroupItem>
        <Row>
          <Col lg={2}>
            <div className="">
              <div>{toAddress}</div>
              <div>{txHash}</div>
            </div>
          </Col>
          <Col lg={2}>{dataNode.value}</Col>
          <Col lg={2}>
            <div>{txLabel}</div>
            <div>{txDescription}</div>
          </Col>
          <Col lg={2}>
            <div>{dataNode.block.number}</div>
            <div>{dateString}</div>
          </Col>
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
              <div>Address {walletAddress}</div> 
            </div>
          </Col>
          <Col lg={6}>
            <div className="left-label-container">Ethereum balance {walletBalance}</div>
          </Col>
          </Row>
          <Row>
          <Col lg={12}>
            <div className="left-label-container">
              {numOfInvoicesSent} Invoices Created. {numOfInvoicesSentPaid} invoices paid.
            </div>
          </Col>
          <Row>
          </Row>
          <Col lg={12}>
            <div className="left-label-container">
              {numOfInvoicesReceived} Invoices Received. {numOfInvoicesReceivedPaid} invoices paid.
            </div>
          </Col>
          </Row>
          </div>
          <Tabs defaultActiveKey="from" id="home-view-tab" onSelect={this.homeTabToggle}>
            <Tab eventKey="to" title="Incoming">
              <ListGroup>
                <ListGroupItem className="table-header"> 
                <Row>
                  <Col lg={2}>
                    Identifier
                  </Col>
                  <Col lg={2}>
                    Amount
                  </Col>
                  <Col lg={2}>
                    Details
                  </Col>
                  
                  <Col lg={2}>
                    Block
                  </Col>
                  <Col lg={2}>
                    Transaction Data
                  </Col>
                  </Row>
                </ListGroupItem>
                {transactionList}
              </ListGroup>
            </Tab>
            <Tab eventKey="from" title="Outgoing">
              <ListGroup>
              
                <ListGroupItem className="table-header"> 
                <Row>
                  <Col lg={2}>
                    Identifier
                  </Col>
                  <Col lg={2}>
                    Amount
                  </Col>
                  <Col lg={2}>
                    Details
                  </Col>
                  
                  <Col lg={2}>
                    Block
                  </Col>
                  <Col lg={2}>
                    Transaction Data
                  </Col>
                  </Row>
                </ListGroupItem>
                
                {transactionList}
              </ListGroup>
            </Tab>
        </Tabs>  
      </Container>

    )
  }
}
