import React from 'react'
import { Transaction } from '../../model/finance'

interface Props {
  sortBy?: keyof Transaction
  sortDir?: 'asc' | 'desc'
  toggleSort?: (field: keyof Transaction) => void
}

const TransactionList: React.FC<Props> = ({
  children,
  sortBy,
  sortDir,
  toggleSort,
}) => {
  const sortClass = (field: string): string | undefined =>
    sortBy === field ? `sort-${sortDir}` : undefined

  const onClick = (field: keyof Transaction) => {
    if (toggleSort !== undefined) {
      return () => toggleSort(field)
    }
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th className={sortClass('date')} onClick={onClick('date')}>
            Datum
          </th>
          <th className={sortClass('debit')} onClick={onClick('debit')}>
            Soll
          </th>
          <th className={sortClass('credit')} onClick={onClick('credit')}>
            Haben
          </th>
          <th className={sortClass('text')} onClick={onClick('text')}>
            Text
          </th>
          <th className={sortClass('who')} onClick={onClick('who')}>
            Wer
          </th>
          <th className={sortClass('amount')} onClick={onClick('amount')}>
            Betrag
          </th>
          <th className={sortClass('receipt')} onClick={onClick('receipt')}>
            Beleg
          </th>
          <th />
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

export default TransactionList
