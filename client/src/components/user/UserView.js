import React, { Component } from 'react';

import UserTransactionQuery from './UserTransactionQuery';
import CreateInvoice from './CreateInvoice';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { isNonEmptyArray } from '../../utils/ObjectUtils';
import { checkIfPaymentStatusUpdate } from '../../utils/ObjectUtils';
import UserInvoiceList from './UserInvoiceList';
import TransactionStatusContainer from '../transaction/TransactionStatusContainer';
import './user.css';

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = { dialogVisible: false, pendingTransactions: [] };
  }
  componentWillMount() {
    this.props.getPreviousInvoices();

    this.listenForInvoicePayments();
  }

  submitInvoice(payload) {

  }

  listenForInvoicePayments = () => {
    const self = this;
    this.timer = setInterval(function() {
      self.props.getPreviousInvoices();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    const { user: { previousInvoices } } = nextProps;

    if (previousInvoices && this.props.user.previousInvoices.length > 0) {
      let invoiceDiff = checkIfPaymentStatusUpdate(previousInvoices, this.props.user.previousInvoices);
      if (isNonEmptyArray(invoiceDiff)) {
        let currentPendingTransactions = this.state.pendingTransactions;
        currentPendingTransactions.push(invoiceDiff);
        this.setState({ pendingTransactions: currentPendingTransactions })
      }
    }
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  handleCloseDialog = () => {
    this.setState({ dialogVisible: false });
  }

  render() {
    const { dialogVisible, pendingTransactions } = this.state;
    const { user } = this.props;
    let pendingTransactionList = <span/>;
    if (isNonEmptyArray(pendingTransactions)) {

      pendingTransactionList =

        pendingTransactions.map(function(item, idx) {
          return <TransactionStatusContainer key={`${item}+${idx}`} transaction_hash={item}/>;
        });
    }
    return (
      <Container>
      
      {pendingTransactionList}
      <CreateInvoice dialogVisible={dialogVisible} handleCloseDialog={this.handleCloseDialog} submitInvoice={this.props.submitInvoice}/>
      <Row className="add-invoice-btn-row">
        <Col lg={3}>
        <Button onClick={this.showDialog} className="add-invoice-btn">Create New Invoice</Button>
        </Col>
        <Col lg={9}>
        
        </Col>
      </Row>
      <Row> 
        <Col lg={12}>
          <UserInvoiceList previousInvoices={user.previousInvoices}/>
        </Col>
      </Row>
      </Container>
    )
  }
}
