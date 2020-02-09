import React, { Component } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import InvoicesList from './InvoicesList';
import { getWeb3Authentication } from '../../utils/Web3Utils';
export default class ManagerView extends Component {
  componentWillMount() {
    getWeb3Authentication();
    this.props.listInvoices();
  }

  render() {
    return (
      <Container>
        <InvoicesList/>
    </Container>
    )
  }
}
