import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates'

const TransactionFilter = ({ text, startDate, endDate, setFilter }) => {
  const [focusedInput, setFocusedInput] = useState('START_DATE')
  return (
    <p className='form-row'>
      <DateRangePicker
        startDate={startDate}
        startDateId='journal-date-range-start'
        startDatePlaceholderText='von'
        endDate={endDate}
        endDateId='journal-date-range-end'
        endDatePlaceholderText='bis'
        onDatesChange={({ startDate, endDate }) =>
          setFilter({ text, startDate, endDate })
        }
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        numberOfMonths={1}
        showClearDates={true}
        firstDayOfWeek={1}
        isOutsideRange={() => false}
      />
      <input
        type='text'
        className='form-control col-md-8 ml-3 my-auto'
        placeholder='Filter'
        value={text}
        onChange={(e) =>
          setFilter({ text: e.target.value, startDate, endDate })
        }
      />
    </p>
  )
}

export default TransactionFilter
