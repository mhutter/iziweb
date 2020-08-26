import React from 'react'

const TransactionList: React.FC = ({ children }) => (
  <table className='table'>
    <thead>
      <tr>
        <th>Datum</th>
        <th>Soll</th>
        <th>Haben</th>
        <th>Text</th>
        <th>Wer</th>
        <th>Betrag</th>
        <th>Beleg</th>
        <th />
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
)

export default TransactionList
