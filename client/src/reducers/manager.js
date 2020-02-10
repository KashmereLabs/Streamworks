import { LIST_INVOICES, LIST_INVOICES_SUCCESS, LIST_INVOICES_FAILURE } from '../actions/manager';

const initialState = {
  invoices: [],
  isFetching: false,
  error: false,
  success: false,
}

export default function managerReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_INVOICES:
      return { ...state }
    case LIST_INVOICES_SUCCESS:
      return { ...state, invoices: action.payload.data };

    default:
      return state
  }
}
