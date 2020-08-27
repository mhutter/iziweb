import React, { useState, useEffect } from 'react'

import TransactionList from './TransactionList'
import ImportForm from './ImportForm'
import finance from '../../api/finance'
import Error from '../Error'
import TransactionRow from './TransactionRow'
import { Transaction, sortTransactions } from '../../model/finance'

const Journal: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [sort, setSort] = useState<{
    by: keyof Transaction
    dir: 'asc' | 'desc'
  }>({ by: 'date', dir: 'desc' })
  const [sorted, setSorted] = useState<Array<Transaction>>([])

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
    setSorted(transactions.slice().sort(sortTransactions(sort.by, sort.dir)))
  }, [transactions, sort])

  const addTransactions = (txs: Array<Transaction>) =>
    setTransactions(transactions.concat(txs))

  const deleteTransaction = (id: string) =>
    finance
      .deleteTransaction(id)
      .then(
        () => setTransactions(transactions.filter((t) => t.id !== id)),
        setError
      )

  const toggleSort = (field: keyof Transaction) => {
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
