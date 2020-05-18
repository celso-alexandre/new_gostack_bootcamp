import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'

let fakeCacheProvider: FakeCacheProvider
let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'testuser@testdomain.com',
      name: 'Test User One',
      password: 'MyUs3rP4ssw0rd',
    })

    expect(user).toHaveProperty('id')
    expect(user.email).toBe('testuser@testdomain.com')
    expect(user.name).toBe('Test User One')
  })

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      email: 'testuser@testdomain.com',
      name: 'Test User One',
      password: 'MyUs3rP4ssw0rd',
    })

    await expect(
      createUser.execute({
        email: 'testuser@testdomain.com',
        name: 'Test User One',
        password: 'MyUs3rP4ssw0rd',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
