import React from 'react'

const TransactionList = ({ children, sortBy, sortDir, toggleSort }) => {
  const sortClass = (field) =>
    sortBy === field ? `sort-${sortDir}` : undefined

  const onClick = (field) => (toggleSort ? () => toggleSort(field) : undefined)

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
