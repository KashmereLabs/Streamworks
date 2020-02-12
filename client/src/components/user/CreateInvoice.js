import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

var util = require('web3-utils');
export default class CreateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '', pay: 0, type: '', hours: 0, perHour: true, perProject: false, label: '', description: '' };
  }
  submitInvoice = () => {
    const { address, pay, type, hours, label, description, perHour } = this.state;
    let amount = 0;

    if (perHour) {
      amount = pay * hours;
    }
    else {
      amount = pay;
    }

    const sender_address = window.ethereum.selectedAddress;

    const payload = {
      sender_address: sender_address.toLowerCase(),
      recipient_address: address.toLowerCase(),
      amount: amount,
      description,
      label
    }
    this.props.submitInvoice(payload);
    this.props.handleCloseDialog();
  }

  perHourToggle = (evt) => {
    this.setState({ perHour: evt.target.checked, perProject: !evt.target.checked })
  }

  perProjectToggle = (evt) => {
    this.setState({ perProject: evt.target.checked, perHour: !evt.target.checked });
  }

  hoursChanged = (evt) => {
    this.setState({ hours: evt.target.value });
  }

  payChanged = (evt) => {
    this.setState({ pay: evt.target.value });
  }

  managerAddressChanged = (evt) => {
    this.setState({ address: evt.target.value });
  }

  labelChanged = (evt) => {
    this.setState({ label: evt.target.value });
  }

  descriptionChanged = (evt) => {
    this.setState({ description: evt.target.value });
  }

  render() {
    const { dialogVisible, handleCloseDialog, } = this.props;
    const { pay, description, perHour, perProject, hours, address, label, } = this.state;


    let currentPayForm = <span/>;
    if (perHour) {
      currentPayForm =
        <div>
        <Form.Row>
          <Col>
                <Form.Control type="text" placeholder="Enter amount" value={pay} onChange={this.payChanged}/>
                <Form.Text className="text-muted">
                    Enter the amount (Ether)
                </Form.Text>
           </Col> 
         <Col>
                <Form.Control type="text" placeholder="Enter hours" value={hours} onChange={this.hoursChanged}/>
                <Form.Text className="text-muted">
                    Enter the hours
                </Form.Text>
          </Col>     
        </Form.Row>
    </div>
    }
    else {
      currentPayForm = <Form.Group>
          <Form.Control type="text" placeholder="Enter amount" value={pay} onChange={this.payChanged}/>
          <Form.Text className="text-muted">
              Enter the amount (Ether)
          </Form.Text>
      </Form.Group>
    }
    return (
      <div>
      <Modal show={dialogVisible} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Enter Ethereum address of recipient</Form.Label>
    <Form.Control type="text" placeholder="Enter wallet address" value={address} onChange={this.managerAddressChanged}/>
    <Form.Text className="text-muted" >
      Enter the public key of your manager's wallet
    </Form.Text>
  </Form.Group>
    
  <Form.Group controlId="description">
   <Form.Label>Label</Form.Label>
    <Form.Control type="text" placeholder="What is the invoice for?" value={label} onChange={this.labelChanged}/>

  </Form.Group>  
  
     <Form.Group controlId="formBasicEmail">   
      <Form.Check  inline
        type={"radio"}
        id={`default-`}
        label={`Per Hour`}
        name="projectType"
        checked={perHour}
        onChange={this.perHourToggle}
      />
        <Form.Check  inline
        type={"radio"}
        id={`default-`}
        label={`Per Project`}
        checked={perProject}
        onChange={this.perProjectToggle}
      />
      </Form.Group>
      {currentPayForm}
  <Form.Group controlId="description">
    <Form.Label>Description/Comments</Form.Label>
    <Form.Control as="textarea" rows="3" value={description} onChange={this.descriptionChanged}/>
  </Form.Group>   
  </Form>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.submitInvoice}>
            Create Invoice
          </Button>
        </Modal.Footer>
      </Modal>      
      </div>
    )
  }
}
