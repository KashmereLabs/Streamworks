import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Container, Tabs, Tab, Button } from 'react-bootstrap';
import { getAccountDetails } from '../../utils/Web3Utils';
import './home.scss';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
const ETHQ_ENDPOINT = process.env.REACT_APP_ETHQ_ENDPOINT;

export default class HomeView extends Component {
  componentWillMount() {
    this.state = { 'toggle': 'to' };
    this.props.getWalletHistory(this.state.toggle);
    this.props.getUserInfo();
    const self = this;

    window.ethereum.on('accountsChanged', function(accounts) {
      self.props.getWalletEthBalance();
      self.props.getWalletHistory(self.state.toggle);
    })
  }

  componentDidMount() {
    const self = this;
    setTimeout(function() {
      self.props.getWalletEthBalance();
    }, 1000);
  }

  homeTabToggle = (toggle) => {
    this.setState({ toggle: toggle });
    this.props.getWalletHistory(toggle);
  }
  render() {
    const { user: { walletHistory, userInfo, balance } } = this.props;

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
      transactionList = walletHistory.map(function(data, idx) {
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
          dateString = moment(parseInt(dataNode.block.header.timestamp, 10)).format("YY-MM-DD HH:mm");
        }
        let toAddress = dataNode.to.substr(0, 5) + "...." + dataNode.to.substr(dataNode.to.length - 6, dataNode.to.length - 1);
        let txHash = dataNode.hash.substr(0, 5) + "...." + dataNode.to.substr(dataNode.to.length - 6, dataNode.to.length - 1);
        return <ListGroupItem key={`${dataNode.to}-${idx}}`}>
        <Row>
          <Col lg={2} className="identifier-container">
            <div>
              <div className="">
                <div className="cell-data"><a href={`${ETHQ_ENDPOINT}/search?q=(from:${dataNode.to}%20OR%20to:${dataNode.to})`} target="_blank">{toAddress}</a></div>
                <div className="cell-label">Sender</div>
                </div>
              <div>
                <div className="cell-data"><a href={`${ETHQ_ENDPOINT}/tx/${dataNode.hash}`} target="_blank">{txHash}</a></div>
                <div className="cell-label">Tx Hash</div>
              </div>
            </div>
          </Col>
          <Col lg={2} className="value-container">{dataNode.value}</Col>
          <Col lg={3} className="invoice-description-container">
            <div>
            <div className="cell-data">{txLabel}</div>
            <div className="cell-label">Label</div>
            </div>
            <div className="cell-data">
              {txDescription}
            <div className="cell-label">Description</div>
            </div>
          </Col>
          <Col lg={2} className="mining-block-container">
            <div>
              <div className="cell-data">{dataNode.block.number}</div>
              <div className="cell-label">Mining block</div>
            </div>
            <div>
              <div className="cell-data">{dateString}</div>
              <div className="cell-label">Mined on</div>
            </div>
          </Col>
          <Col lg={2} className="value-container">
            <div>
            <div className="cell-data">{dataNode.gasUsed}</div>
            <div className="cell-label">Gas Used (Wei)</div>
            </div>
            <div>
            <div className="cell-data">{dataNode.flatCalls ? dataNode.flatCalls[0].inputData : ""}</div>
            <div className="cell-label">Input data</div>            
            </div>
          </Col>
        </Row>
        </ListGroupItem>
      })
    }
    return (
      <Container className="home-page-container">
        <div className="top-info-container">
          <Row>
          <Col lg={6}>
            <div className="left-label-container">
              <div className="cell-value"><a href={`${ETHQ_ENDPOINT}/search?q=(from:${walletAddress}%20OR%20to:${walletAddress})`} target="_blank">{walletAddress}</a></div>
              <div className="cell-label">Address</div> 
            </div>
          </Col>
          <Col lg={3}>
            <div className="left-label-container">
              <div className="cell-value">{Number(balance).toFixed(2)} ether</div>
              <div className="cell-label">Ethereum balance</div>
            </div>
          </Col>
          </Row>
          <Row className="invoice-snapshot-row">
              <Col lg={3}>
              <div className="cell-value">{numOfInvoicesSent}</div>
              <div className="cell-label">Created Invoices.</div>
              </Col>
              <Col lg={3}>
              <div className="cell-value">{numOfInvoicesSentPaid}</div>
              <div className="cell-label">Paid</div>
              </Col>
              <Col lg={3}>
                <div className="cell-value">{numOfInvoicesSent - numOfInvoicesSentPaid}</div>
                <div className="cell-label">Unpaid</div>
              </Col>
              <Col lg={2}>
               <Link to="/user">
               <Button className="invoice-btn secondary-btn">View Sent Invoices</Button>
               </Link>
              </Col>
          </Row>
     
          <Row className="invoice-snapshot-row">
              <Col lg={3}>
              <div className="cell-value">{numOfInvoicesReceived}</div>
              <div className="cell-label">Recieved Invoices.</div>
              </Col>
              <Col lg={3}>
              <div className="cell-value">{numOfInvoicesReceivedPaid}</div>
              <div className="cell-label">Paid</div>
              </Col>
              <Col lg={3}>
                <div className="cell-value">{numOfInvoicesReceived - numOfInvoicesReceivedPaid}</div>
                <div className="cell-label">Unpaid</div>
              </Col>
              <Col lg={2}>
                <Link to="/manager">
                  <Button className="invoice-btn secondary-btn">View Recieved Invoices</Button></Link>
              </Col>
          </Row>
          </div>
          <Row>
            <Col lg={12} className="invoice-table-header">
            <div className="h4">Latest Invoice Payments</div>
            </Col>
          </Row>
          <Tabs defaultActiveKey="to" id="home-view-tab" onSelect={this.homeTabToggle}>
            <Tab eventKey="to" title="Recieved">
              <ListGroup>
                <ListGroupItem className="list-table-header"> 
                <Row>
                  <Col lg={2} className="invoice-description-label">
                    Identifier
                  </Col>
                  <Col lg={2} className="value-label">
                    Amount (Eth)
                  </Col>
                  <Col lg={3} className="invoice-description-label">
                    Invoice Details
                  </Col>
                  
                  <Col lg={2} className="invoice-description-label">
                    Block
                  </Col>
                  <Col lg={2} className="value-label">
                    Transaction Data
                  </Col>
                  </Row>
                </ListGroupItem>
                {transactionList}
              </ListGroup>
            </Tab>
            <Tab eventKey="from" title="Sent">
              <ListGroup>
                <ListGroupItem className="list-table-header"> 
                <Row>
                  <Col lg={2} className="invoice-description-label">
                    Identifier
                  </Col>
                  <Col lg={2} className="value-label">
                    Amount (Eth)
                  </Col>
                  <Col lg={3} className="invoice-description-label">
                    Invoice Details
                  </Col>
                  <Col lg={2} className="invoice-description-label">
                    Block
                  </Col>
                  <Col lg={2} className="value-label">
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
