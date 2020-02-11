import HomeView from './HomeView';
import { listInvoices, listInvoicesSuccess, listInvoicesFailure } from '../../actions/manager';
import {
  getWalletHistory,
  getWalletHistorySuccess,
  getWalletHistoryFailure,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailure,
  getWalletEthBalance,
  getWalletEthBalanceSuccess,
  getWalletEthBalanceFailure
}
from '../../actions/user';

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

    getUserInfo: () => {
      dispatch(getUserInfo()).then(function(userInfoResponse) {
        dispatch(getUserInfoSuccess(userInfoResponse.payload.data));
      }).catch(function(err) {
        dispatch(getUserInfoFailure(err));
      })
    },

    getWalletHistory: (type) => {
      dispatch(getWalletHistory(type)).then(function(response) {
        let responseData = [];
        if (response.payload.data.searchTransactions && response.payload.data.searchTransactions.edges) {
          responseData = response.payload.data.searchTransactions.edges;
        }
        dispatch(getWalletHistorySuccess(responseData));
      }).catch(function(err) {
        dispatch(getWalletHistoryFailure(err));
      })
    },

    getWalletEthBalance: () => {
      dispatch(getWalletEthBalance()).then(function(response) {
        dispatch(getWalletEthBalanceSuccess(response.payload))
      }).catch(function(err) {
        dispatch(getWalletEthBalanceFailure());
      })
    }



  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
