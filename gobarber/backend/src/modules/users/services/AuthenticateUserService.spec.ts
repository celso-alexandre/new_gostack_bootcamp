import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService
let createUser: CreateUserService

describe('FakeHashProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to login with a just created created user', async () => {
    const user = await createUser.execute({
      name: 'Test User',
      email: 'testuser@testdomain.com',
      password: 'MyUs3rP4ssw0rd',
    })

    const response = await authenticateUser.execute({
      email: 'testuser@testdomain.com',
      password: 'MyUs3rP4ssw0rd',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to login with a non-existent email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'testuser123@testdomain.com',
        password: 'MyUs3rP4ssw0rd',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to login with wrong password', async () => {
    await createUser.execute({
      name: 'Test User',
      email: 'testuser@testdomain.com',
      password: 'MyUs3rP4ssw0rd',
    })

    await expect(
      authenticateUser.execute({
        email: 'testuser@testdomain.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
