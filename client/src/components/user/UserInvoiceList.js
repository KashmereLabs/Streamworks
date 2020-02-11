import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class UserInvoiceList extends Component {
  render() {
    const { previousInvoices } = this.props;
    let invoices = previousInvoices.map(function(item, idx) {
      return <ListGroupItem key={`${item._id}-idx`}>
        <Row>
          <Col lg={2}>
            <div className="address-block">{item.recipient_address}</div>
          </Col>
          <Col lg={2}>
            <div>{item.amount}</div>
          </Col>
          <Col lg={2}>
            <div>{item.label}</div>
            <div>{item.description}</div>
          </Col>
          <Col lg={2}>
           {item.status}
          </Col>
        </Row>
      </ListGroupItem>
    })
    return (
      <div>
        <ListGroup>
          <ListGroupItem className="list-table-header">
          <Row>
            <Col lg={2}>
              Identifier
            </Col>
            <Col lg={2}>
              Amount
            </Col>
            <Col lg={2}>
              Description
            </Col>
            <Col lg={2}>
              Invoice Status
            </Col>
            <Col lg={2}>
              Transaction Status
            </Col>
            </Row>
          </ListGroupItem>
          {invoices}
        </ListGroup>
      </div>
    )
  }
}
