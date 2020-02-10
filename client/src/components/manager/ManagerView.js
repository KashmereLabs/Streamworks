import React, { Component } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import InvoicesList from './InvoicesList';
import { getWeb3Authentication } from '../../utils/Web3Utils';
import { getTransactionStatus } from '../../utils/DfuseUtils';
import TransactionStatusContainer from '../transaction/TransactionStatusContainer';

export default class ManagerView extends Component {
  componentWillMount() {
    getWeb3Authentication();
    this.props.listInvoices();
  }
  componentWillReceiveProps(nextProps) {
    const { transaction: { pendingTransactionID } } = nextProps;
    const self = this;

    if (pendingTransactionID && pendingTransactionID !== this.props.transaction.pendingTransactionID) {

    }
  }

  render() {
    const { manager, transaction } = this.props;
    let currentTransactionStatus = <span/>;

    if (transaction.pendingTransactionID && transaction.pendingTransactionID.length > 0) {
      currentTransactionStatus = <TransactionStatusContainer transaction_hash={transaction.pendingTransactionID}/>
    }
    return (
      <Container>
        {currentTransactionStatus}
        <InvoicesList invoices={manager.invoices} payInvoice={this.props.payInvoice}/>
    </Container>
    )
  }
}
