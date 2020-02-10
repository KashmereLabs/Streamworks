import {
  SUBMIT_INVOICE,
  SUBMIT_INVOICE_SUCCESS,
  SUBMIT_INVOICE_FAILURE,
  GET_WALLET_HISTORY,
  GET_WALLET_HISTORY_SUCCESS,
  GET_WALLET_HISTORY_FAILURE,
  GET_PREVIOUS_INVOICES,
  GET_PREVIOUS_INVOICES_FAILURE,
  GET_PREVIOUS_INVOICES_SUCCESS
}
from '../actions/user';

const initialState = {
  createInvoice: {},
  walletHistory: [],
  previousInvoices: [],
  isFetching: false,
  error: false,
  success: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_INVOICE:
      return { ...state }
    case GET_WALLET_HISTORY:
      return { ...state }
    case GET_WALLET_HISTORY_SUCCESS:
      return { ...state, walletHistory: action.payload }
    case GET_WALLET_HISTORY_FAILURE:
      return { ...state }
    case GET_PREVIOUS_INVOICES:
      return { ...state }
    case GET_PREVIOUS_INVOICES_SUCCESS:
      return { ...state, previousInvoices: action.payload.data }
    case GET_PREVIOUS_INVOICES_FAILURE:
      return { ...state }
    default:
      return state
  }
}
