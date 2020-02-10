import HomeView from './HomeView';
import { listInvoices, listInvoicesSuccess, listInvoicesFailure } from '../../actions/manager';
import { getWalletHistory, getWalletHistorySuccess, getWalletHistoryFailure } from '../../actions/user';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user,
    manager: state.manager
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

    getWalletHistory: () => {
      dispatch(getWalletHistory()).then(function(response) {
        let responseData = [];
        if (response.payload.data.searchTransactions && response.payload.data.searchTransactions.edges) {
          responseData = response.payload.data.searchTransactions.edges;
        }
        dispatch(getWalletHistorySuccess(responseData));
      }).catch(function(err) {
        dispatch(getWalletHistoryFailure(err));
      })
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
