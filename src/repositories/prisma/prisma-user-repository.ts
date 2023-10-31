// Third party
import { Prisma } from '@prisma/client'

// Project
import { IUserRepository } from '../user-repository'
import { prisma } from '../../lib/prisma'

export class PrismaUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findByCPF(cpf: string) {
    const user = await prisma.user.findUnique({
      where: { cpf },
    })

    return user
  }

  async findByCnpj(cnpj: string) {
    const user = await prisma.user.findUnique({
      where: { cnpj },
    })

    return user
  }
}