import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import * as moment from 'moment';

const ETHQ_ENDPOINT = process.env.REACT_APP_ETHQ_ENDPOINT;

export default class UserInvoiceList extends Component {
  render() {
    const { previousInvoices } = this.props;
    let invoices = previousInvoices.map(function(item, idx) {
      let recipientAddress = item.recipient_address.substr(0, 5) + "...." + item.recipient_address.substr(item.recipient_address.length - 6, item.recipient_address.length - 1);
      let transactionHash = item.transaction_hash ? item.transaction_hash.substr(0, 5) + "...." + item.recipient_address.substr(item.recipient_address.length - 6, item.recipient_address.length - 1) : "-";

      return <ListGroupItem key={`${item._id}-idx`}>
        <Row>
          <Col lg={2}>
            <div>
            <div className="cell-data"><a href={`${ETHQ_ENDPOINT}/search?q=(from:${item.recipient_address}%20OR%20to:${item.recipient_address})`} target="_blank">{recipientAddress}</a></div>
            <div className="cell-label">Recipient Address</div>
            </div>
          </Col>
          <Col lg={2}>
            {moment(item.date_created).format("YY-MM-DD HH:mm")}
          </Col>              
          <Col lg={2}>
            <div>{item.amount}</div>
          </Col>
          <Col lg={3} className="invoice-description-data">
            <div>
              <div>
              <div className="cell-data">{item.label}</div>
              <div className="cell-label">Label</div>
              </div>
            <div>
              <div className="cell-data">
              {item.description}
              </div>
              <div className="cell-label">
                Description
              </div>
            </div>
            </div>
          </Col>
          <Col lg={1}>
            <div> 
              <div className="cell-data">
              {item.status}
              </div>
              <div className="cell-label">
                Status
              </div>
            </div>
          </Col>

          <Col lg={2}>
                      <div> 
              <div className="cell-data">
            <a href={`${ETHQ_ENDPOINT}/search?q=(from:${item.transaction_hash}%20OR%20to:${item.transaction_hash})`} target="_blank">{transactionHash}</a>
              </div>
              <div className="cell-label">
                Transaction Hash
              </div>
            </div>
            
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
              Created on
            </Col>            
            <Col lg={2}>
              Amount (Eth)
            </Col>
            <Col lg={3} className="cell-description-header">
              Description
            </Col>
            <Col lg={2}>
              Invoice Status
            </Col>

            </Row>
          </ListGroupItem>
          {invoices}
        </ListGroup>
      </div>
    )
  }
}
