 // Third party
import { Prisma, Wallet } from '@prisma/client'

// Local
import { ITransaction, IUpdateWallet } from './types'

export interface IWalletRepository {
  create: (user_id: string) => Promise<Wallet>
  update?: ({
    wallet_id, user_id, data
  }: IUpdateWallet) => Promise<Wallet>
  findByUserId: (user_id: string) => Promise<Wallet | null>
  transaction?: ({
    payee,
    value
  }: ITransaction) => Promise<unknown>
}