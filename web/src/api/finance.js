import moment from 'moment'

import { Transaction } from '../model/finance'

const reqBase: RequestInit = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; encoding=utf-8',
  },
  mode: 'same-origin',
  redirect: 'error',
}

const getTransactions = async () => {
  return fetch('/api/finance/transactions', { ...reqBase, method: 'GET' })
    .then(checkStatus)
    .then(parseJSON)
    .then(parseTransactions)
}

const createTransactions = async (transactions) => {
  return fetch('/api/finance/transactions', {
    ...reqBase,
    method: 'POST',
    body: JSON.stringify(transactions),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(parseTransactions)
}

const deleteTransaction = async (id) => {
  return fetch(`/api/finance/transactions/${id}`, {
    ...reqBase,
    method: 'DELETE',
  }).then(checkStatus)
}

const parseTransactions = (body) =>
  body.map(parseTransaction)

const parseTransaction = (tx): Transaction => ({
  ...tx,
  date: moment(tx.date),
  amount: tx.amount / 100,
  saved: true,
})

const checkStatus = async (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const msg = response.body
    ? await response.text()
    : `HTTP Error ${response.statusText}`

  throw new Error(msg)
}

const parseJSON = (response: Response) => response.json()

const finance = { createTransactions, getTransactions, deleteTransaction }
export default finance
