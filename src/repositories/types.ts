// Third party
import { Prisma } from '@prisma/client'

export interface IUpdateWallet {
  wallet_id: string,
  user_id: string,
  data: Pick<Prisma.WalletUpdateInput, 'money'>
}

export interface ITransaction {
  payee: string,
  payer: string
  value: Prisma.Decimal
}

export interface ITransactionHistory {
  user_id: string
  wallet_id: string
  data: {
    payer: { id: string, name: string }
    payee: { id: string, name: string }
    value: number
  }
}