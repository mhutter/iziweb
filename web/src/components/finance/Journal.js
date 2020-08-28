import React, { useState, useEffect } from 'react'

import TransactionList from './TransactionList'
import ImportForm from './ImportForm'
import finance from '../../api/finance'
import Error from '../Error'
import TransactionRow from './TransactionRow'
import { sortTransactions } from '../../model/finance'

const Journal = () => {
  // State
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [sort, setSort] = useState({ by: 'date', dir: 'desc' })
  const [sorted, setSorted] = useState([])

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

  useEffect(() => {
    setSorted(transactions.slice().sort(sortTransactions(sort)))
  }, [transactions, sort])

  const addTransactions = (txs) =>
    setTransactions(transactions.concat(txs))

  const deleteTransaction = (id) =>
    finance
      .deleteTransaction(id)
      .then(
        () => setTransactions(transactions.filter((t) => t.id !== id)),
        setError
      )

  const toggleSort = (field) => {
    setSort({
      by: field,
      dir: sort.by === field && sort.dir === 'desc' ? 'asc' : 'desc',
    })
  }

  const transactionList = isLoading ? (
    <div className='alert alert-success'>Lade Daten...</div>
  ) : (
      <TransactionList
        sortBy={sort.by}
        sortDir={sort.dir}
        toggleSort={toggleSort}
      >
        {sorted.map((t) => (
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
