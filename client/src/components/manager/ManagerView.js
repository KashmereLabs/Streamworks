import React, { Component } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import InvoicesList from './InvoicesList';
import { getTransactionStatus } from '../../utils/DfuseUtils';
import TransactionStatus from '../transaction/TransactionStatus';
import './manager.scss';

export default class ManagerView extends Component {
  componentWillMount() {
    this.props.listInvoices();
    this.listenForInvoicePayments();
  }


  listenForInvoicePayments = () => {
    const self = this;
    this.timer = setInterval(function() {
      self.props.listInvoices();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  render() {
    const { manager, transaction } = this.props;
    let currentTransactionStatus = <span/>;

    if (transaction.pendingTransactionID && transaction.pendingTransactionID.length > 0) {
      currentTransactionStatus = <TransactionStatus transaction_hash={transaction.pendingTransactionID}/>
    }
    let invoiceList = <span/>;
    if (manager.invoices.length > 0) {
      invoiceList = <InvoicesList invoices={manager.invoices} payInvoice={this.props.payInvoice}/>
    }
    else {
      invoiceList = <div className="empty-list-container">Looks like you haven't recieved any invoices yet.</div>
    }
    return (
      <Container>
        {currentTransactionStatus}
        {invoiceList}
    </Container>
    )
  }
}
