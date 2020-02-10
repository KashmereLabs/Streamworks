import axios from 'axios';
import { searchWalletHistory } from '../utils/DfuseUtils';

const API_SERVER = process.env.REACT_APP_API_SERVER;

export const SUBMIT_INVOICE = 'SUBMIT_INVOICE';
export const SUBMIT_INVOICE_SUCCESS = 'SUBMIT_INVOICE_SUCCESS';
export const SUBMIT_INVOICE_FAILURE = 'SUBMIT_INVOICE_FAILURE';

export const GET_WALLET_HISTORY = 'GET_WALLET_HISTORY';
export const GET_WALLET_HISTORY_SUCCESS = 'GET_WALLET_HISTORY_SUCCESS';
export const GET_WALLET_HISTORY_FAILURE = 'GET_WALLET_HISTORY_FAILURE';

export const GET_PREVIOUS_INVOICES = 'GET_PREVIOUS_INVOICES';
export const GET_PREVIOUS_INVOICES_SUCCESS = 'GET_PREVIOUS_INVOICES_SUCCESS';
export const GET_PREVIOUS_INVOICES_FAILURE = 'GET_PREVIOUS_INVOICES_FAILURE';

export function submitInvoice(payload) {
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

export function getWalletHistory() {
  const walletAddress = window.ethereum.selectedAddress;
  const request = searchWalletHistory(walletAddress);
  return {
    type: GET_WALLET_HISTORY,
    payload: request
  }
}

export function getWalletHistorySuccess(response) {
  return {
    type: GET_WALLET_HISTORY_SUCCESS,
    payload: response
  }
}


export function getWalletHistoryFailure(err) {
  return {
    type: GET_WALLET_HISTORY_FAILURE,
    payload: err
  }
}

export function getPreviousInvoices() {
  const walletAddress = window.ethereum.selectedAddress;
  const request = axios.get(`${API_SERVER}/user/invoices?address=${walletAddress}`);
  return {
    type: GET_PREVIOUS_INVOICES,
    payload: request
  }
}

export function getPreviousInvoicesSuccess(response) {
  return {
    type: GET_PREVIOUS_INVOICES_SUCCESS,
    payload: response
  }
}

export function getPreviousInvoicesFailure(error) {
  return {
    type: GET_PREVIOUS_INVOICES_FAILURE,
    payload: error
  }
}
