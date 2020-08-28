import React from 'react'
import moment from 'moment'

import TransactionList from './TransactionList'
import Error from '../Error'
import finance from '../../api/finance'
import TransactionRow from './TransactionRow'

class ImportForm extends React.Component {
  initialState: State = { value: '', data: [], error: null }
  state: State = this.initialState

  handleChange(event) {
    const value = event.target.value
    const rows = value
      // split into rows
      .split('\n')
      // split rows into columns and trim each column
      .map((r: string) => r.split('\t').map((c) => c.trim()))
      // ignore the header line
      .filter((parts) => parts[0] !== 'Datum')
    let error = null

    const data = rows
      .map((parts) => {
        if (parts.length !== 7) {
          error = `Ungültige Zeile: ${parts}`
          return null
        }

        // Remove "Fr." etc as well as 1000er dividers (', ...)
        const amount = parts[5].replace(/chf|s?fr\.|['’]/gi, '').trim()

        return {
          date: moment.utc(parts[0], 'DD.MM.YYYY'),
          debit: parseInt(parts[1]),
          credit: parseInt(parts[2]),
          text: parts[3],
          who: parts[4],
          amount: Math.round(parseFloat(amount) * 100),
          receipt: parts[6],
        }
      })
      .filter((i) => i !== null)

    this.setState({ value, data, error })
  }

  handleSubmit(event) {
    event.preventDefault()
    finance.createTransactions(this.state.data).then(
      (transactions) => {
        this.props.addTransactions(transactions)
        this.setState(this.initialState)
      },
      (error) => this.setState({ error })
    )
  }

  render() {
    return (
      <div
        className='ImportForm modal fade'
        tabIndex={-1}
        id='import-data-modal'
      >
        <div className='modal-dialog modal-xl'>
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            className='modal-content'
          >
            <div className='modal-header'>
              <h5 className='modal-title'>Datenimport</h5>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <textarea
                  className='form-control'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <Error error={this.state.error} />
              <TransactionList>
                {this.state.data.map((t, i) => (
                  <TransactionRow key={i} {...t} />
                ))}
              </TransactionList>
            </div>
            <div className='modal-footer'>
              <button
                type='submit'
                className='btn btn-success'
                disabled={
                  this.state.error !== null || this.state.data.length < 1
                }
              >
                Daten importieren
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ImportForm
