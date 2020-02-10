import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { createDfuseClient } from '@dfuse/client';

export default class InvoicesList extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }


  componentWillMount() {
    const web3 = window.web3;
    const selectedAddress = web3.currentProvider.selectedAddress;

    const transactionHash = `to: ${selectedAddress}`;

    let streamTransactionQuery = `subscription {
    searchTransactions(indexName:CALLS query: "${transactionHash}", lowBlockNum: -1000) {
    node {
      from
      to
      value(encoding:ETHER)
      signature {
        v
        s
        r
      }
    }
  }
}`;

    let txnData = [];
    const dfuseClient = createDfuseClient({
      apiKey: 'web_ba3560eac90ff4f5ad36f68d1926ec30',
      network: 'ropsten.eth.dfuse.io'
    });
    const self = this;

    async function fetchTransaction() {

      const stream = await dfuseClient.graphql(streamTransactionQuery, (message) => {

        if (message.type === "error") {
          // setError(message.errors[0]['message'])
          console.log(message);
        }

        if (message.type === "data") {
          let txData = self.state.transactions;
          console.log(message.data.searchTransactions.node);
          if (txData.length < 10) {
            txData.push(message.data.searchTransactions.node);
            self.setState({ transactions: txData });
          }
        }

        if (message.type === "complete") {


        }
      }, {
        variables: {
          hash: transactionHash
        }
      });

      await stream.join() // awaits stream completion, which is never for this operation
    }



    fetchTransaction();

  }
  render() {
    const { transactions, txData } = this.state;
    return (
      <div>
       <ListGroup>
        <ListGroupItem>
          <Row>
            <Col lg={1}>
              #Id
            </Col>
            <Col lg={2}>
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
          {transactions.map((transaction, index) => (
          <ListGroupItem className='transaction' key={`txn-${index}`}>    
              <Row>
                <Col lg={3}>
                {transaction.from}
                </Col>
              </Row>
          </ListGroupItem>    
              ))}
      
      </div>
      </ListGroup>     
      </div>
    )
  }
}
