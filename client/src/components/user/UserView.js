import React, { Component } from 'react';

import UserTransactionQuery from './UserTransactionQuery';
import CreateInvoice from './CreateInvoice';
import { getWeb3Authentication } from '../../utils/Web3Utils';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { isNonEmptyObject } from '../../utils/ObjectUtils';

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = { dialogVisible: false, };
  }
  componentWillMount() {
    getWeb3Authentication();

  }

  submitInvoice(payload) {

  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  handleCloseDialog = () => {
    this.setState({ dialogVisible: false });
  }

  render() {
    const { dialogVisible } = this.state;

    return (
      <Container>
      <CreateInvoice dialogVisible={dialogVisible} handleCloseDialog={this.handleCloseDialog} submitInvoice={this.props.submitInvoice}/>
      <Row>
        <Col lg={3}>
        <Button onClick={this.showDialog}>Create New Invoice</Button>
        </Col>
        <Col lg={9}>
        
        </Col>
      </Row>
      <Row> 
      <Col lg={12}>
        <UserTransactionQuery/>
        </Col>
      </Row>
      </Container>
    )
  }
}
