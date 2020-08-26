/* global fetch */
import moment from 'moment'

const reqBase = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; encoding=utf-8'
  },
  mode: 'same-origin',
  redirect: 'error'
}

const getTransactions = async () => {
  return fetch('/api/finance/transactions', { ...reqBase, method: 'GET' })
    .then(checkStatus)
    .then(parseJSON)
    .then(parseTransactions)
}

const createTransactions = async transactions => {
  return fetch('/api/finance/transactions', {
    ...reqBase,
    method: 'POST',
    body: JSON.stringify(transactions)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(parseTransactions)
}

const deleteTransaction = async id => {
  return fetch(`/api/finance/transactions/${id}`, { ...reqBase, method: 'DELETE' })
    .then(checkStatus)
}

const parseTransactions = body => body.map(parseTransaction)

const parseTransaction = tx => ({
  ...tx,
  date: moment(tx.date),
  saved: true
})

const checkStatus = async response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  if (response.body) {
    error.message = await response.text()
  }
  throw error
}

const parseJSON = response => response.json()

const finance = { createTransactions, getTransactions, deleteTransaction }
export default finance
