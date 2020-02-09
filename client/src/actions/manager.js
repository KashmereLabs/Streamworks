import axios from 'axios';
const API_SERVER = process.env.REACT_APP_API_SERVER;
export const MAKE_INVOICE_PAYMENT = 'MAKE_INVOICE_PAYMENT';
export const MAKE_INVOICE_PAYMENT_SUCCESS = 'MAKE_INVOICE_PAYMENT_SUCCESS';
export const MAKE_INVOICE_PAYMENT_FAILURE = 'MAKE_INVOICE_PAYMENT_FAILURE';
export const LIST_INVOICES = 'LIST_INVOICES';
export const LIST_INVOICES_SUCCESS = 'LIST_INVOICES_SUCCESS';
export const LIST_INVOICES_FAILURE = 'LIST_INVOICES_FAILURE';

export function makeInvoicePayment() {
  return {
    type: MAKE_INVOICE_PAYMENT
  }
}

export function makeInvoicePaymentSuccess() {
  return {
    type: MAKE_INVOICE_PAYMENT_SUCCESS
  }
}

export function makeInvoicePaymentFailure() {
  return {
    type: MAKE_INVOICE_PAYMENT_FAILURE
  }
}

export function listInvoices() {
  const address = window.ethereum.selectedAddress;
  const request = axios.get(`${API_SERVER}/manager/invoices?address=${address}`);
  return {
    type: LIST_INVOICES,
    payload: request
  }
}

export function listInvoicesSuccess(response) {
  return {
    type: LIST_INVOICES_SUCCESS,
    payload: response
  }
}

export function listInvoicesFailure(error) {
  return {
    type: LIST_INVOICES_FAILURE,
    payload: error
  }
}
