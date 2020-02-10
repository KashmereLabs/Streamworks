import {
  PAY_INVOICE,
  PAY_INVOICE_SUCCESS,
  PAY_INVOICE_FAILURE,
  GET_PENDING_TRANSACTION_STATUS,
  GET_PENDING_TRANSACTION_STATUS_SUCCESS,
  GET_PENDING_TRANSACTION_STATUS_FAILURE
}
from '../actions/transaction';

const initialState = {
  invoices: [],
  pendingTransactionID: '',
  pendingTransactionStatus: [],
  isFetching: false,
  error: false,
  success: false,
}

export default function managerReducer(state = initialState, action) {
  switch (action.type) {
    case PAY_INVOICE:
      return { ...state }
    case PAY_INVOICE_SUCCESS:
      return { ...state, pendingTransactionID: action.payload, pendingTransactionStatus: [] };
    case GET_PENDING_TRANSACTION_STATUS_SUCCESS:
      let currentPendingTxn = state.pendingTransactionStatus;
      currentPendingTxn.push(action.payload);
      return { ...state, pendingTransactionStatus: currentPendingTxn };
    default:
      return state
  }
}
