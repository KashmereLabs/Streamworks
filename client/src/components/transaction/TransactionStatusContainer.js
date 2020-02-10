import TransactionStatus from './TransactionStatus';

import {

  getPendingTransactionStatus,
  getPendingTransactionStatusSuccess,
  getPendingTransactionStatusFailure,

}
from '../../actions/transaction';

import { connect } from 'react-redux';
import { getTransactionStatusQuery } from '../../utils/DfuseUtils';

const { createDfuseClient, waitFor } = require("@dfuse/client")

const client = createDfuseClient({
  apiKey: 'web_ba3560eac90ff4f5ad36f68d1926ec30',
  network: 'ropsten.eth.dfuse.io'
});

const mapStateToProps = state => {
  return {
    user: state.user,
    manager: state.manager,
    transaction: state.transaction
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    getPendingTransactionStatus: (txId) => {
      async function subscribeUpdate(txId) {
        const txQuery = getTransactionStatusQuery(txId);
        const stream = await client.graphql(txQuery, (message) => {
          if (message.type === "data") {
            dispatch(getPendingTransactionStatusSuccess(message.data.transactionLifecycle));

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
      subscribeUpdate(txId);

    },


  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionStatus);
