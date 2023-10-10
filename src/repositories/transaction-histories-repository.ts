// Third party
import { transactionHistory } from '@prisma/client'

// Local
import { ITransactionHistory } from './types'

export interface ITransactionHistoriesRepository {
  register: ({ user_id, wallet_id, data }: ITransactionHistory) => Promise<transactionHistory>
  findById: (transaction_history_id: string) => Promise<transactionHistory | null>
}