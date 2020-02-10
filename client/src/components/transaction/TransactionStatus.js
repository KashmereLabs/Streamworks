import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './transactionstatus.css';

export default class TransactionStatus extends Component {
  componentWillMount() {
    const { transaction_hash } = this.props;
    this.props.getPendingTransactionStatus(transaction_hash);
  }

  render() {
    const { transaction: { pendingTransactionStatus } } = this.props;

    let pendingTransactionStepper = <span/>;
    let pendingTransactionStatusDiv = <span/>;

    if (pendingTransactionStatus && pendingTransactionStatus.length > 0) {
      pendingTransactionStatusDiv =
        <div>
        <Col lg={6}>
          {pendingTransactionStatus[pendingTransactionStatus.length - 1].transitionName}
        </Col>
        <Col lg={6}>
          Confirmations {pendingTransactionStatus[pendingTransactionStatus.length - 1].transition.contirmations}
        </Col>
      </div>
      pendingTransactionStepper = pendingTransactionStatus.map(function(item, idx) {

        let prevItem = <span/>;
        let divider = <span/>;
        if (idx === 0) {
          prevItem = <div className="tx-previous-state">{item.previousState}</div>;
          divider = <div className="tx-divider"></div>;
        }
        if (idx > 0) {
          if (item.previousState !== pendingTransactionStatus[idx - 1].currentState) {
            prevItem = <div className="tx-previous-state">{item.previousState}</div>;
            divider = <div className="tx-divider"></div>;
          }
        }

        if (item.previousState !== item.currentState) {
          return <div>
            {prevItem}
            {divider}
        <div className="tx-current-state">{item.currentState}</div>
        </div>
        }
        else {
          return <span/>;
        }
      })
    }


    return (
      <div className="transaction-status-container">
        <Row>
          <Col lg={12} xs={12}>
            {pendingTransactionStatusDiv}
          </Col>
        </Row>
        <Row>
          <Col lg={12} xs={12}>
          {pendingTransactionStepper}
          </Col>
        </Row>
      </div>
    )
  }
}
