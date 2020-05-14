import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let listProvidersService: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    listProvidersService = new ListProvidersService(fakeUsersRepository)
  })

  it('should be able to list providers without listing the logged in provider', async () => {
    const loggedInUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    })

    const providers = await listProvidersService.execute({
      loggedInUserIdToExclude: loggedInUser.id,
    })

    expect(providers).toEqual([user2])
    expect(providers).toHaveLength(1)
  })
})
