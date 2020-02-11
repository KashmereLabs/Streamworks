import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
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
            <Col lg={3}>
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
            actionButton = <Button className="manager-invoice-btn" onClick={self.payInvoice.bind(self, transaction)}>Reciept</Button>
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
                <Col lg={2}>
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
        <div>{transaction.label}</div>
        <div>{transaction.description}</div>
      </div>
    )
  }
}

class TransactioniIdentifier extends Component {
  render() {
    const { transaction } = this.props;
    return (
      <div>
        <div className="address-black">{transaction.sender_address}</div>
      </div>
    )
  }
}
