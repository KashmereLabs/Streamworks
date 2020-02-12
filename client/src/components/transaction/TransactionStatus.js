import React, { Component } from 'react';
import { createDfuseClient } from "@dfuse/client"
import { getTransactionStatusQuery } from '../../utils/DfuseUtils';
import './transactionstatus.scss';

export default class TransactionStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { walletAddress: '', transactionSteps: [] };
  }
  componentWillMount() {
    const { walletAddress, dfuseApiKey } = this.props;
    this.getTransactionStatus();
  }

  getTransactionStatus = () => {
    const { transaction_hash } = this.props;

    const client = createDfuseClient({
      apiKey: 'web_ba3560eac90ff4f5ad36f68d1926ec30',
      network: 'ropsten.eth.dfuse.io'
    });

    const self = this;

    async function subscribeUpdate(txId, self) {
      console.log(txId);

      const txQuery = getTransactionStatusQuery(txId);
      const stream = await client.graphql(txQuery, (message) => {
        if (message.type === "data") {
          let currentTransactionSteps = self.state.transactionSteps;
          currentTransactionSteps.push(message.data.transactionLifecycle);
          console.log(currentTransactionSteps);
          self.setState({ transactionSteps: currentTransactionSteps });

          if (message.data.transactionLifecycle.transitionName === 'CONFIRMED') {
            let transitionConfirmations = message.data.transactionLifecycle.transition.confirmations;
            if (transitionConfirmations >= 16) {
              stream.close();
            }
          }
        }
      })
      await stream.join();
    }
    subscribeUpdate(transaction_hash, self);

  }

  render() {
    const { transactionSteps } = this.state;

    let styles = {
      containerStyle: {
        'background': '#f5f5f5',
        'height': '200px',
      }
    }
    let transactionFromAddress = <span/>;
    let transactionToAddress = <span/>;
    let transactionEtherValue = <span/>;
    let currentStep = <span/>;

    if (transactionSteps.length > 0) {
      let lastTransition = transactionSteps[transactionSteps.length - 1];
      let numConfirmations = "";
      let numConfirmationBlock = <span/>;


      if (lastTransition.transitionName === 'CONFIRMED') {
        numConfirmations = lastTransition.transition.confirmations;
        numConfirmationBlock = <div>{numConfirmations} Confirmations</div>
      }
      currentStep =
        (<div>
        {lastTransition.transitionName}
        {numConfirmationBlock}
      </div>)
      let firstStep = null;
      transactionSteps.forEach(function(ts) {
        if (ts.transition && ts.transition.transaction) {
          firstStep = ts;
        }
      });
      if (firstStep) {
        transactionFromAddress = firstStep.transition.transaction.from;
        transactionToAddress = firstStep.transition.transaction.to;
        transactionEtherValue = firstStep.transition.transaction.value;
      }
    }

    let pendingTransactionSteps = (
      <div className="progress-bar-container">
        {transactionSteps.map(function(item, idx){
        let stepperStep = idx + 1;
        if (item.previousState !== item.currentState) {
          return (
          <div key={"tx-confirmation-"+idx}>
            <div className="stepper-circle-container">
            <div className="stepper-circle stepper-left">
              {stepperStep}
            </div>
             {item.previousState}
            </div>
            <div className="stepper-line"></div>
            <div className="stepper-circle-container">
              <div className="stepper-circle stepper-right">
                {stepperStep + 1}
              </div>
              { item.currentState }
            </div>
          </div>
          )
        } else {
          return <span/>;
        }
        })}
      </div>
    )
    return (
      <div style={styles.containerStyle}>
        <div>
          <div>
          New Transaction recieved
          <div>
            <div className="cell-container">
              <div className="cell-data">
                {transactionFromAddress}
              </div>
              <div className="cell-label">
                From
              </div>
              </div>
              <div className="cell-container">
              <div className="cell-data">
                {transactionToAddress}
              </div>
              <div className="cell-label">
                To
              </div>
              </div>
              <div className="cell-container">
              <div className="cell-data">
                {transactionEtherValue}
              </div>
              <div className="cell-label">
                Ether Value
              </div>
              </div>
              </div>
          </div>
          <div>
          {currentStep}
          </div>
        </div>
        {pendingTransactionSteps}
      </div>
    )
  }
}
