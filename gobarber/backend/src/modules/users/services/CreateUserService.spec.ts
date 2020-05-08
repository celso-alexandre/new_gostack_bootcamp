import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

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
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    await createUser.execute({
      email: 'testuser@testdomain.com',
      name: 'Test User One',
      password: 'MyUs3rP4ssw0rd',
    })

    expect(
      createUser.execute({
        email: 'testuser@testdomain.com',
        name: 'Test User One',
        password: 'MyUs3rP4ssw0rd',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
