// Third party
import { Wallet } from '@prisma/client'

// Project
import { IWalletRepository } from '../repositories/wallet-repository'

export interface IWallet {
  user_id: string
}

export interface ICreateWalletUseResponse {
  wallet: Wallet
}

export class CreateUserUseCase {
  constructor(private walletRepository: IWalletRepository) { }

  async execute(data: IWallet): Promise<ICreateWalletUseResponse> {
    const wallet = await this.walletRepository.create(data.user_id)

    return { wallet }
  }
}