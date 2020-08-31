import React, { useState } from 'react'
import moment from 'moment'
import finance from '../../api/finance'

const initialState = () => ({
  date: moment.utc().startOf('day').format('YYYY-MM-DD'),
  debit: 1000,
  credit: 1000,
  text: '',
  who: '',
  amount: 0.0,
  receipt: '',
})

const TransactionForm = ({ addTransactions, setError }) => {
  const [data, setData] = useState(initialState())

  const onSubmit = (e) => {
    e.preventDefault()
    finance
      .createTransactions([
        {
          ...data,
          debit: parseInt(data.debit),
          credit: parseInt(data.credit),
          amount: data.amount * 100,
          date: moment().utc(data.date),
        },
      ])
      .then((txs) => {
        addTransactions(txs)
        setError(null)
        setData({
          ...data,
          text: '',
          who: '',
          amount: 0,
          receipt: '',
        })
      }, setError)
  }

  return (
    <tr>
      <td colSpan={7}>
        <form onSubmit={onSubmit}>
          <div className='row'>
            <div className='col-md-2'>
              <input
                className='form-control'
                type='date'
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
              />
            </div>
            <div className='col-md-1'>
              <input
                className='form-control'
                type='number'
                value={data.debit}
                onChange={(e) => setData({ ...data, debit: e.target.value })}
                min={1000}
                max={9999}
              />
            </div>
            <div className='col-md-1'>
              <input
                className='form-control'
                type='number'
                value={data.credit}
                onChange={(e) => setData({ ...data, credit: e.target.value })}
                min={1000}
                max={9999}
              />
            </div>
            <div className='col-md-3'>
              <input
                className='form-control'
                type='text'
                value={data.text}
                onChange={(e) => setData({ ...data, text: e.target.value })}
                required
                placeholder='Text'
              />
            </div>
            <div className='col-md-2'>
              <input
                className='form-control'
                type='text'
                value={data.who}
                onChange={(e) => setData({ ...data, who: e.target.value })}
                placeholder='Wer'
              />
            </div>
            <div className='col-md-2'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>Fr.</div>
                </div>
                <input
                  className='form-control'
                  type='number'
                  value={data.amount}
                  onChange={(e) => setData({ ...data, amount: e.target.value })}
                  placeholder='0.00'
                  step={0.01}
                  min={0.01}
                />
              </div>
            </div>
            <div className='col-md-1'>
              <input
                className='form-control'
                type='text'
                value={data.receipt}
                onChange={(e) => setData({ ...data, receipt: e.target.value })}
                placeholder='Beleg'
              />
            </div>
          </div>
          <button type='submit' className='d-none' />
        </form>
      </td>
    </tr>
  )
}

export default TransactionForm
