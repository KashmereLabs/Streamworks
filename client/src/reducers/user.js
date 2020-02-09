import { SUBMIT_INVOICE, SUBMIT_INVOICE_SUCCESS, SUBMIT_INVOICE_FAILURE } from '../actions/user';

const initialState = {
  createInvoice: {},

  isFetching: false,
  error: false,
  success: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_INVOICE:
      return { ...state }

    default:
      return state
  }
}
