import { makePaymentTransaction } from '../utils/Web3Utils';
import { getTransactionStatus } from '../utils/DfuseUtils';
import axios from 'axios';

export const GET_USER_PAYINS = 'GET_USER_PAYINS';
export const GET_USER_PAYINS_SUCCESS = 'GET_USER_PAYINS_SUCCESS';
export const GET_USER_PAYINS_FAILURE = 'GET_USER_PAYINS_FAILURE';

export const GET_USER_PAYOUTS = 'GET_USER_PAYOUTS';

export const PAY_INVOICE = 'PAY_INVOICE';
export const PAY_INVOICE_SUCCESS = 'PAY_INVOICE_SUCCESS';
export const PAY_INVOICE_FAILURE = 'PAY_INVOICE_FAILURE';

export const GET_PENDING_TRANSACTION_STATUS = 'GET_PENDING_TRANSACTION_STATUS';
export const GET_PENDING_TRANSACTION_STATUS_SUCCESS = 'GET_PENDING_TRANSACTION_STATUS_SUCCESS';
export const GET_PENDING_TRANSACTION_STATUS_FAILURE = 'GET_PENDING_TRANSACTION_STATUS_FAILURE';

export const UPDATE_INVOICE = 'UPDATE_INVOICE';
export const UPDATE_INVOICE_SUCCESS = 'UPDATE_INVOICE_SUCCESS';
export const UPDATE_INVOICE_FAILURE = 'UPDATE_INVOICE_FAILURE';

const API_SERVER = process.env.REACT_APP_API_SERVER;

export function payInvoice(transaction) {
  const request = makePaymentTransaction(transaction);
  return {
    type: PAY_INVOICE,
    payload: request
  }
}

export function payInvoiceSuccess(response) {
  return {
    type: PAY_INVOICE_SUCCESS,
    payload: response
  }
}

export function payInvoiceFailure(err) {
  return {
    type: PAY_INVOICE_FAILURE,
    payload: err
  }
}

export function getPendingTransactionStatus(txId) {
  const request = getTransactionStatus(txId);
  return {
    type: GET_PENDING_TRANSACTION_STATUS,
    payload: request
  }
}

export function getPendingTransactionStatusSuccess(response) {
  return {
    type: GET_PENDING_TRANSACTION_STATUS_SUCCESS,
    payload: response
  }
}

export function getPendingTransactionStatusFailure(err) {
  return {
    type: GET_PENDING_TRANSACTION_STATUS_FAILURE,
    payload: err
  }
}

export function updateInvoice(payload) {
  const request = axios.put(`${API_SERVER}/user/invoice`, payload);
  return {
    type: UPDATE_INVOICE,
    payload: request
  }
}

export function updateInvoiceSuccess(response) {
  return {
    type: UPDATE_INVOICE_SUCCESS,
    payload: response
  }
}

export function updateInvoiceFailure(err) {
  return {
    type: UPDATE_INVOICE_FAILURE,
    payload: err
  }
}
