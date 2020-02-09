import axios from 'axios';
const API_SERVER = process.env.REACT_APP_API_SERVER;

export const SUBMIT_INVOICE = 'SUBMIT_INVOICE';
export const SUBMIT_INVOICE_SUCCESS = 'SUBMIT_INVOICE_SUCCESS';
export const SUBMIT_INVOICE_FAILURE = 'SUBMIT_INVOICE_FAILURE';

export function submitInvoice(payload) {
  console.log(payload);
  const request = axios.post(`${API_SERVER}/user/invoice`, payload);
  return {
    type: SUBMIT_INVOICE,
    payload: request
  }
}

export function submitInvoiceSuccess(payload) {
  return {
    type: SUBMIT_INVOICE_SUCCESS,
    payload: payload
  }
}

export function submitInvoiceFailure(err) {
  return {
    type: SUBMIT_INVOICE_FAILURE,
    payload: err
  }
}
