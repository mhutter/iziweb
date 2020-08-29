export function sortTransactions({ by, dir }) {
  return (a, b) => {
    let result = 0
    const l = a[by]
    const r = b[by]

    switch (by) {
      case 'text':
      case 'who':
      case 'receipt':
        result = l.toLocaleLowerCase().localeCompare(r.toLocaleLowerCase())
        break
      case 'debit':
      case 'credit':
      case 'amount':
        result = l - r
        break
      case 'date':
        result = l.unix() - r.unix()
        break
      default:
        return 0
    }

    return result * (dir === 'desc' ? -1 : 1)
  }
}

export function filterTransactions({ text, startDate, endDate }) {
  text = text.toLocaleLowerCase()
  return (t) => {
    const textMatch =
      text === '' ||
      t.date.format('DD.MM.YYYY').includes(text) ||
      t.debit.toString().includes(text) ||
      t.credit.toString().includes(text) ||
      t.text.toLocaleLowerCase().includes(text) ||
      t.who.toLocaleLowerCase().includes(text) ||
      t.amount.toString().includes(text) ||
      t.receipt.toLocaleLowerCase().includes(text)

    const startDateMatch = startDate === null || t.date >= startDate
    const endDateMatch = endDate === null || t.date <= endDate

    return textMatch && startDateMatch && endDateMatch
  }
}
