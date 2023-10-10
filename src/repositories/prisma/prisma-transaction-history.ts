// Project
import { prisma } from '../../lib/prisma'
import { ITransactionHistory } from '../types'
import { ITransactionHistoriesRepository } from '../transaction-histories-repository'

export class PrismaUserRepository implements ITransactionHistoriesRepository {
  async register({ user_id, wallet_id, data }: ITransactionHistory) {
    const transactionHistory = await prisma.transactionHistory.create({
      data: {
        user_id,
        wallet_id,
        transaction_register: data
      },
    })

    return transactionHistory
  }

  async findById(transaction_history_id: string) {
    const transactionHistory = await prisma.transactionHistory.findUnique({
      where: { id: transaction_history_id },
    })

    return transactionHistory
  }
}