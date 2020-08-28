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
