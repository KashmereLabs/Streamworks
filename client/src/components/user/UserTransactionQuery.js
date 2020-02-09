import React, { Component, useState } from 'react';
import { createDfuseClient } from '@dfuse/client';
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';

export default class UserTransactionQuery extends Component {

  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }


  componentWillMount() {

    const transactionHash = 'from:0x1335E0750d74B21A837cCBD4D1a7e30699001848';

    let streamTransactionQuery = `subscription {
    searchTransactions(indexName:CALLS query: "to: 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d", lowBlockNum: -1000) {
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
          <Col lg={3}>
            From
          </Col>
          <Col lg={3}>
            Amount
          </Col>
          <Col lg={3}>
            Remarks
          </Col>
        </Row>
      </ListGroupItem>
      <div>
          {transactions.map((transaction, index) => (
          <ListGroupItem className='transaction-list-item' key={`txn-${index}`}>    
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
