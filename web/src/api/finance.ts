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

const createTransactions = async (transactions: object) => {
  return fetch('/api/finance/transactions', {
    ...reqBase,
    method: 'POST',
    body: JSON.stringify(transactions),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(parseTransactions)
}

const deleteTransaction = async (id: string) => {
  return fetch(`/api/finance/transactions/${id}`, {
    ...reqBase,
    method: 'DELETE',
  }).then(checkStatus)
}

const parseTransactions = (body: Array<Transaction>) =>
  body.map(parseTransaction)

const parseTransaction = (tx: Transaction): Transaction => ({
  ...tx,
  date: moment(tx.date),
  saved: true,
})

const checkStatus = async (response: Response) => {
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
