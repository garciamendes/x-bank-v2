// Node
import { randomUUID } from 'node:crypto'

// Project
import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../user-repository'

export class InMemoryUsersRepository implements IUserRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name ?? null,
      email: data.email,
      password_hash: data.password_hash,
      cpf: data.cpf,
      cnpj: data.cnpj ?? null,
      role: data.role,
      created: new Date(),
      modified: new Date(),
      status: data.status ?? 'ACTIVATE'
    }

    this.items.push(user)
    return user
  }

  async findByCPF(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf)

    if (!user) return null

    return user
  }
}