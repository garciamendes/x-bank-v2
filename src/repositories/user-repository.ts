// Third party
import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  // update: (data: Omit<Prisma.UserUpdateInput, 'password_hash'>) => Promise<User>
  findByCPF: (cpf: string) => Promise<User | null>
}