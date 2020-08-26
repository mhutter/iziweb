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
