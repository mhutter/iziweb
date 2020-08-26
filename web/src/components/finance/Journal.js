import React, { useState, useEffect } from 'react'

import TransactionList from './TransactionList'
import ImportForm from './ImportForm'
import finance from '../../api/finance'
import Error from '../Error'
import Transaction from './Transaction'

const Journal = props => {
  // State
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [transactions, setTransactions] = useState([])

  // lazily load transactions
  useEffect(() => {
    setIsLoading(true)
    setError(null)

    finance.getTransactions()
      .then(
        // on success
        setTransactions,
        // on error
        setError
      )
    setIsLoading(false)
  }, [])

  const addTransactions = txs => setTransactions(transactions.concat(txs))
  const deleteTransaction = id => {
    finance.deleteTransaction(id).then(
      () => setTransactions(transactions.filter(t => t.id !== id)),
      setError
    )
  }

  const transactionList = isLoading
    ? <div className='alert alert-success'>Lade Daten...</div>
    : (
      <TransactionList>
        {transactions.map(t => (
          <Transaction key={t.id} {...t} deleteTransaction={deleteTransaction} />
        ))}
      </TransactionList>
    )

  return (
    <div className='Journal'>
      <h1>Buchungsjournal</h1>
      <Error error={error} />
      {transactionList}

      <ImportForm addTransactions={addTransactions} />
      <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#import-data-modal'>
          Datenimport
      </button>
    </div>
  )
}

export default Journal
