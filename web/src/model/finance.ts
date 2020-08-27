export interface Transaction {
  readonly id: string
  date: moment.Moment
  debit: number
  credit: number
  text: string
  who?: string
  amount: number
  receipt?: string
  saved?: boolean
}

export function sortTransactions(
  by: keyof Transaction,
  dir: 'asc' | 'desc'
): (a: Transaction, b: Transaction) => number {
  return (a: Transaction, b: Transaction): number => {
    let result = 0

    switch (by) {
      case 'id':
      case 'text':
      case 'who':
      case 'receipt':
        const ls = (a[by] as string).toLocaleLowerCase()
        const rs = (b[by] as string).toLocaleLowerCase()
        result = ls.localeCompare(rs)
        break
      case 'debit':
      case 'credit':
      case 'amount':
        const ln = a[by] as number
        const rn = b[by] as number
        result = ln - rn
        break
      case 'date':
        const ld = a[by] as moment.Moment
        const rd = b[by] as moment.Moment
        result = ld.unix() - rd.unix()
    }

    return result * (dir === 'desc' ? -1 : 1)
  }
}
