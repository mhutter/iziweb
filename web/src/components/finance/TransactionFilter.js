import React from 'react'

const TransactionFilter = ({ filter, setFilter }) => {
  return (
    <p className='form-row'>
      <input
        type='text'
        className='form-control'
        placeholder='Filter'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </p>
  )
}

export default TransactionFilter
