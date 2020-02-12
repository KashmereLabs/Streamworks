import UserView from './UserView';
import {
  submitInvoice,
  submitInvoiceSuccess,
  submitInvoiceFailure,
  getPreviousInvoices,
  getPreviousInvoicesSuccess,
  getPreviousInvoicesFailure,
  getTransactionListStatus,
  getTransactionListStatusSuccess,
  getTransactionListStatusError
}
from '../../actions/user';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitInvoice: (payload) => {
      dispatch(submitInvoice(payload)).then(function(response) {
        if (response.payload.status === 200) {
          dispatch(submitInvoiceSuccess(response.payload.data));
        }
      }).catch(function(err) {
        dispatch(submitInvoiceFailure(err));
      })
    },

    getPreviousInvoices: () => {
      dispatch(getPreviousInvoices()).then(function(response) {
        const previousInvoiceList = response.payload.data;


        dispatch(getPreviousInvoicesSuccess(previousInvoiceList));
      }).catch(function(err) {
        dispatch(getPreviousInvoicesFailure(err));
      })
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
