import ManagerView from './ManagerView';
import { listInvoices, listInvoicesSuccess, listInvoicesFailure } from '../../actions/manager';
import {
  payInvoice,
  payInvoiceSuccess,
  payInvoiceFailure,
  updateInvoice,
  updateInvoiceSuccess,
  updateInvoiceFailure
}
from '../../actions/transaction';

import { connect } from 'react-redux';

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
