// Third party
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

// Project
import { IUserRepository } from '../repositories/user-repository'

// Local
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { PasswordNotMatchError } from './errors/password-not-match-error'
import { FieldRequiredError } from './errors/field-requireded-error'
import { CpfAlreadyExistsError } from './errors/cpf-already-exists-error'
import { CnpjAlreadyExistsError } from './errors/cnpj-already-exists-error'

export interface IUser {
  name?: string
  email: string
  cpf?: string
  cnpj?: string
  confirmPassword: string
  password: string
  is_customer_shopkeeper?: boolean
}

export interface ICreateUserUseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IUser): Promise<ICreateUserUseResponse> {
    const userExist = await this.userRepository.findByEmail(data.email)

    if (userExist) throw new UserAlreadyExistsError()

    if (data.password !== data.confirmPassword) throw new PasswordNotMatchError()

    if (!data.is_customer_shopkeeper && !data.cpf?.trim())
      throw new FieldRequiredError()

    if (data.is_customer_shopkeeper && !data.cnpj?.trim())
      throw new FieldRequiredError()

    if (data.cpf) {
      const userByCpfExist = await this.userRepository.findByCPF(data.cpf as string)
      if (userByCpfExist) throw new CpfAlreadyExistsError()
    }

    if (data.cnpj) {
      const userByCnpjExist = await this.userRepository.findByCnpj(data.cnpj as string)
      if (userByCnpjExist) throw new CnpjAlreadyExistsError()
    }

    const password_hash = await hash(data.password, 12)

    const user = await this.userRepository.create({
      cpf: data.cpf ? data.cpf : '',
      email: data.email,
      name: data.name,
      password_hash,
      role: data.is_customer_shopkeeper ? 'CUSTOMER_SHOPKEEPER' : 'CUSTOMER_NORMAL',
      cnpj: data.is_customer_shopkeeper ? data.cnpj : '',
    })

    return { user }
  }
}