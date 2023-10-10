// Node
import { randomUUID } from 'node:crypto'

// Third party
import { Decimal } from '@prisma/client/runtime/library'

// Project
import { Prisma, transactionHistory } from '@prisma/client'
import { ITransactionHistory } from '../types'
import { ITransactionHistoriesRepository } from '../transaction-histories-repository'

export class InMemoryTransactionHistoryRepository implements ITransactionHistoriesRepository {
  public items: transactionHistory[] = []

  async register({ user_id, wallet_id, data }: ITransactionHistory) {
    const transaction_history: transactionHistory = {
      id: randomUUID(),
      user_id: user_id,
      wallet_id: wallet_id,
      transaction_register: {
        'payee': {
          'id': data.payee.id,
          'name': data.payee.name,
        },
        'payer': {
          'id': data.payer.id,
          'name': data.payer.name,
        },
        'value': data.value,
      },
      created: new Date()
    }

    this.items.push(transaction_history)
    return transaction_history
  }

  async findById(transaction_history_id: string) {
    const transaction_history = this.items.find(row => row.id === transaction_history_id)

    if (!transaction_history) return null

    return transaction_history
  }

}