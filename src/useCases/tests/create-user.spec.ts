// Third party
import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

// Project
import { CreateUserUseCase } from '../createUser'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-user-repository'

// Local
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let userRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('Validando ver se todo o fluxo de cadastro de usuário deem certo', async () => {
    const { user } = await sut.execute({
      name: 'Garcia',
      email: 'garcia1@gmail.com',
      password: 'dev123',
      confirmPassword: 'dev123',
      cpf: '99999999999',
      is_customer_shopkeeper: false
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Verificando se é possível cadastro pessoa lojista', async () => {
    const { user } = await sut.execute({
      name: 'Garcia',
      email: 'garcia6@gmail.com',
      password: 'dev123',
      confirmPassword: 'dev123',
      is_customer_shopkeeper: true,
      cnpj: '99999999999999'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Verficando se a senha do usuario está sendo criado como hash', async () => {
    const { user } = await sut.execute({
      name: 'Garcia',
      email: 'garcia1@gmail.com',
      password: 'dev123',
      confirmPassword: 'dev123',
      cpf: '99999999999',
      is_customer_shopkeeper: false
    })

    const isPasswordCorrectlyhashed = await compare(
      'dev123',
      user.password_hash,
    )

    expect(isPasswordCorrectlyhashed).toBe(true)
  })

  it('Não pode ser possível cadastro com um email existente', async () => {
    const email = 'garcia6@gmail.com'

    await sut.execute({
      name: 'Garcia',
      email,
      password: 'dev123',
      confirmPassword: 'dev123',
      cpf: '99999999999',
      is_customer_shopkeeper: false
    })

    await expect(() =>
      sut.execute({
        name: 'Garcia',
        email,
        password: 'dev123',
        confirmPassword: 'dev123',
        cpf: '99999999999',
        is_customer_shopkeeper: false
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('Não pode ser possível cadastro com um cpf existente', async () => {
    const cpf = '99999999999'

    await sut.execute({
      name: 'Garcia',
      email: 'garcia6@gmail.com',
      password: 'dev123',
      confirmPassword: 'dev123',
      cpf,
      is_customer_shopkeeper: false
    })

    await expect(() =>
      sut.execute({
        name: 'Garcia',
        email: 'garcia6@gmail.com',
        password: 'dev123',
        confirmPassword: 'dev123',
        cpf,
        is_customer_shopkeeper: false
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('Não pode ser possível cadastro com um cnpj existente', async () => {
    const cnpj = '99999999999999'

    await sut.execute({
      name: 'Garcia',
      email: 'garcia6@gmail.com',
      password: 'dev123',
      confirmPassword: 'dev123',
      cnpj,
      is_customer_shopkeeper: true
    })

    await expect(() =>
      sut.execute({
        name: 'Garcia',
        email: 'garcia6@gmail.com',
        password: 'dev123',
        confirmPassword: 'dev123',
        cnpj,
        is_customer_shopkeeper: true
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})