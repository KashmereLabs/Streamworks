import React, { Component } from 'react';
import { createDfuseClient } from "@dfuse/client"
import { getTransactionStatusQuery } from '../../utils/DfuseUtils';
import './transactionstatus.scss';
const ETHQ_ENDPOINT = process.env.REACT_APP_ETHQ_ENDPOINT;

export default class TransactionStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { walletAddress: '', transactionSteps: [], containerVisibleToggle: 'display: block' };
  }
  componentWillMount() {
    const { walletAddress, dfuseApiKey } = this.props;
    this.getTransactionStatus();
  }

  getTransactionStatus = () => {
    const { transaction_hash } = this.props;

    const client = createDfuseClient({
      apiKey: process.env.REACT_APP_DFUSE_API_KEY,
      network: process.env.REACT_APP_DFUSE_NETWORK
    });

    const self = this;

    async function subscribeUpdate(txId, self) {
      const txQuery = getTransactionStatusQuery(txId);
      const stream = await client.graphql(txQuery, (message) => {
        if (message.type === "data") {
          let currentTransactionSteps = self.state.transactionSteps;
          currentTransactionSteps.push(message.data.transactionLifecycle);

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

  hideOuterContainer = () => {
    console.log("hide container");
  }
  render() {
    const { transactionSteps } = this.state;

    let styles = {
      containerStyle: {
        'background': '#f5f5f5',
        'marginTop': '20px',
      }
    }
    let transactionFromAddress = "";
    let transactionToAddress = "";
    let transactionEtherValue = <span/>;
    let currentStep = <span/>;
    let transactionFromDisplay = <span/>;
    let transactionToDisplay = <span/>;

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

        transactionFromDisplay = transactionFromAddress.substr(0, 5) + "...." + transactionFromAddress.substr(transactionFromAddress.length - 6, transactionFromAddress.length - 1);
        transactionFromDisplay = <a href={`${ETHQ_ENDPOINT}/tx/${transactionFromAddress}`} target="_blank">{transactionFromDisplay}</a>;

        transactionToDisplay = transactionToAddress.substr(0, 5) + "...." + transactionToAddress.substr(transactionToAddress.length - 6, transactionToAddress.length - 1);
        transactionToDisplay = <a href={`${ETHQ_ENDPOINT}/tx/${transactionToAddress}`} target="_blank">{transactionToDisplay}</a>;

      }
    }

    let steps = [];
    transactionSteps.forEach(function(item, idx) {
      if (idx === 0) {
        let currentStepList = [{ 'label': item.previousState }]

        if (item.currentState !== item.previousState) {
          currentStepList.push({ 'label': item.currentState })
        }
        steps = steps.concat(currentStepList);
      }
      else {
        let currentStepList = [];
        if (item.previousState !== transactionSteps[idx - 1].currentState) {
          currentStepList.push({ 'label': item.previousState })
        }
        if (item.currentState !== item.previousState) {
          currentStepList.push({ 'label': item.currentState })
        }
        steps = steps.concat(currentStepList);
      }
    });

    let pendingTransactionSteps = (


      <div className="progress-bar-container">
        {steps.map(function(item, idx){
        let stepperStep = idx + 1;
        let joiner = <span/>;
        if (idx < steps.length - 1) {
          joiner =  <div className="stepper-line"></div>
        }
        return (
          <span>
              <div className="stepper-circle-container" key={"tx-confirmation-"+idx}>
                <div className="stepper-circle stepper-left">
                  {stepperStep}
                </div>
                {item.label}
              </div>
              {joiner}
          </span>
        )
        })}
        </div>



    )
    return (
      <div className="pending-transaction-outer-container">
      
      <div>
      <div style={styles.containerStyle}>
          
          <div className="step-header-container">
            <div>
              New Transaction received
            </div>
            <div className="hide-container-check" onClick={this.hideOuterContainer}>&#xd7;</div>
          </div>
          <div className="stepper-body-container">
          <div className="status-cell-meta">
            <div className="cell-container">
              <div className="cell-data">
                {transactionFromDisplay}
              </div>
              <div className="cell-label">
                From
              </div>
            </div>
            <div className="cell-container">
              <div className="cell-data">
                {transactionToDisplay}
              </div>
              <div className="cell-label">
                To
              </div>
            </div>
            <div className="cell-container">
              <div className="cell-data">
                {transactionEtherValue} Ether
              </div>
              <div className="cell-label">
                Value
              </div>
            </div>
            
          </div>
          <div className="current-status-stepper">
            <div className="status-line">
              {currentStep}
            </div>
            <div className="status-step">
              { pendingTransactionSteps } 
            </div>
          </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}
