import ManagerView from './ManagerView';
import { listInvoices, listInvoicesSuccess, listInvoicesFailure } from '../../actions/manager';
import {
  payInvoice,
  payInvoiceSuccess,
  payInvoiceFailure,
  getPendingTransactionStatus,
  getPendingTransactionStatusSuccess,
  getPendingTransactionStatusFailure,
  updateInvoice,
  updateInvoiceSuccess,
  updateInvoiceFailure
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
    listInvoices: () => {
      dispatch(listInvoices()).then(function(response) {
        if (response.payload.status === 200) {
          dispatch(listInvoicesSuccess(response.payload.data));
        }
      }).catch(function(err) {
        dispatch(listInvoicesFailure(err));
      })
    },

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

    payInvoice: (transaction) => {
      dispatch(payInvoice(transaction)).then(function(response) {
        dispatch(payInvoiceSuccess(response.payload));
        const updateInvoicePayload = {
          'id': transaction._id,
          'status': 'paid',
          'transaction_hash': response.payload
        };
        dispatch(updateInvoice(updateInvoicePayload)).then(function(updateInvoiceResponse) {
          dispatch(updateInvoiceSuccess(updateInvoiceResponse.payload));
        }).catch(function(err) {
          dispatch(updateInvoiceFailure(err));
        })

      }).catch(function(err) {
        dispatch(payInvoiceFailure(err));
      })

    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerView);