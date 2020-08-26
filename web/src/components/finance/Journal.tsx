import React, { useState, useEffect } from 'react'

import TransactionList from './TransactionList'
import ImportForm from './ImportForm'
import finance from '../../api/finance'
import Error from '../Error'
import TransactionRow from './TransactionRow'
import { Transaction } from '../../model/finance'

const Journal: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [transactions, setTransactions] = useState<Array<Transaction>>([])

  // lazily load transactions
  useEffect(() => {
    setIsLoading(true)
    setError(null)

    finance.getTransactions().then(
      // on success
      setTransactions,
      // on error
      setError
    )
    setIsLoading(false)
  }, [])

  const addTransactions = (txs: Array<Transaction>) =>
    setTransactions(transactions.concat(txs))
  const deleteTransaction = (id: string) =>
    finance
      .deleteTransaction(id)
      .then(
        () => setTransactions(transactions.filter((t) => t.id !== id)),
        setError
      )

  const transactionList = isLoading ? (
    <div className='alert alert-success'>Lade Daten...</div>
  ) : (
    <TransactionList>
      {transactions.map((t) => (
        <TransactionRow
          key={t.id}
          {...t}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </TransactionList>
  )

  return (
    <div className='Journal'>
      <h1>Buchungsjournal</h1>
      <Error error={error} />
      {transactionList}

      <ImportForm addTransactions={addTransactions} />
      <button
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target='#import-data-modal'
      >
        Datenimport
      </button>
    </div>
  )
}

export default Journal
