// Project
import { prisma } from '../../lib/prisma'
import { IWalletRepository } from '../wallet-repository'

export class PrismaWalletRepository implements IWalletRepository {
  async create(user_id: string) {
    const wallet = await prisma.wallet.create({
      data: { user_id },
    })

    return wallet
  }

  async findByUserId(user_id: string) {
    const wallet = await prisma.wallet.findUnique({
      where: { user_id },
    })

    return wallet
  }

  // async transaction({ payee, payer, value }: ITransaction) {
  //   const walletPayer = await this.findByUserId(payer)
  //   const walletPayee = await this.findByUserId(payee)

  //   const runTransaction = () => {

  //   }

  //   return {}
  // }
}