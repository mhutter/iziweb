import React from 'react'

const moneyFormat = new Intl.NumberFormat('de-CH', { minimumFractionDigits: 2 })

const Transaction = (
  { id, date, debit, credit, text, who, amount, receipt, deleteTransaction }
) => {
  const deleteButton = deleteTransaction
    ? <button className='btn btn-danger btn-sm' onClick={() => deleteTransaction(id)}>X</button>
    : null

  return (
    <tr>
      <td>{date.format('DD.MM.YYYY')}</td>
      <td>{debit}</td>
      <td>{credit}</td>
      <td>{text}</td>
      <td>{who}</td>
      <td className='chf'>{moneyFormat.format(amount / 100)}</td>
      <td>{receipt}</td>
      <td>{deleteButton}</td>
    </tr>
  )
}

export default Transaction
