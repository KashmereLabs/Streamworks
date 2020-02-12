import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
const ETHQ_ENDPOINT = process.env.REACT_APP_ETHQ_ENDPOINT;

export default class InvoicesList extends Component {
  payInvoice(transaction) {
    this.props.payInvoice(transaction);
  }

  render() {
    const { invoices } = this.props;
    const self = this;

    return (
      <div>
       <ListGroup className="manager-invoice-list">
        <ListGroupItem className="list-table-header">
          <Row>
            <Col lg={3}>
              From
            </Col>
            <Col lg={2}>
              Amount
            </Col>
            <Col lg={3} className="transaction-detail-header">
              Details
            </Col>
            <Col lg={2}>
              Status
            </Col>
            <Col lg={1}>
              Action
            </Col>
          </Row>
        </ListGroupItem>
              <div>
          {invoices.map((transaction, index) => {
          let actionButton = <span/>;
          if (transaction.status === 'paid') {
            actionButton = 
            <a href={`${ETHQ_ENDPOINT}/tx/${transaction.transaction_hash}`} target="_blank">
            <Button className="manager-invoice-btn secondary-btn">Reciept</Button>
            </a>
          } else {
             actionButton = <Button className="manager-invoice-btn" onClick={self.payInvoice.bind(self, transaction)}>Pay</Button>
          }
         return <ListGroupItem className='transaction' key={`txn-${index}`}>    
              <Row>

                <Col lg={3}>
                <TransactioniIdentifier transaction={transaction}/>
                </Col>
                <Col lg={2}>
                {transaction.amount}
                </Col>
                <Col lg={2} className="transaction-detail-cell">
                  <TransactionDetails transaction={transaction} key={`description-key-${index}`}/>
                </Col>
                <Col lg={3}>
                {transaction.status}
                </Col>
                <Col lg={1}>
                  {actionButton}
                </Col>
              </Row>
          </ListGroupItem>    
              })}
      
      </div>
      </ListGroup>     
      </div>
    )
  }
}

class TransactionDetails extends Component {
  render() {
    const { transaction } = this.props;
    return (
      <div>
        <div className="cell-data">
          {transaction.label}
        </div>
        <div className="cell-label">
          Label
        </div>
        <div className="cell-data">
          {transaction.description}
        </div>
        <div className="cell-label">
          Description
        </div>
      </div>
    )
  }
}

class TransactioniIdentifier extends Component {
  render() {
    const { transaction } = this.props;
    let senderAddress = transaction.sender_address ?
      transaction.sender_address.substr(0, 5) + "...." + transaction.sender_address.substr(transaction.sender_address.length - 6, transaction.sender_address.length - 1) :
      "";
    let senderAddressLink = "";
    if (senderAddress) {
      senderAddressLink = <a href={`${ETHQ_ENDPOINT}/search?q=(from:${transaction.sender_address}%20OR%20to:${transaction.sender_address})`} target="_blank">{senderAddress}</a>;
    }

    return (
      <div>
        <div>
          {senderAddressLink}
        </div>
      </div>
    )
  }
}
