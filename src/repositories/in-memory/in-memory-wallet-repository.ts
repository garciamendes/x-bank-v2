// Node
import { randomUUID } from 'node:crypto'

// Third party
import { Decimal } from '@prisma/client/runtime/library'

// Project
import { Wallet } from '@prisma/client'
import { IWalletRepository } from '../wallet-repository'

export class InMemoryUsersRepository implements IWalletRepository {
  public items: Wallet[] = []

  async create(user_id: string) {
    const wallet: Wallet = {
      id: randomUUID(),
      money: new Decimal(0),
      created: new Date(),
      status: 'ACTIVATE',
      user_id: user_id
    }

    this.items.push(wallet)
    return wallet
  }

  async findByUserId(user_id: string) {
    const wallet = this.items.find(row => row.user_id === user_id)

    if (!wallet) return null

    return wallet
  }

}