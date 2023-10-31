// Third party
import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  // update: (data: Omit<Prisma.UserUpdateInput, 'password_hash'>) => Promise<User>
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findByCPF: (cpf: string) => Promise<User | null>
  findByCnpj: (cnpj: string) => Promise<User | null>
}