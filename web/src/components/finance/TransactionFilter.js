import React from 'react'

const TransactionFilter = ({ text, setFilter }) => (
  <p>
    <input
      type='text'
      className='form-control'
      placeholder='Filter'
      value={text}
      onChange={(e) => setFilter({ text: e.target.value })}
    />
  </p>
)

export default TransactionFilter
