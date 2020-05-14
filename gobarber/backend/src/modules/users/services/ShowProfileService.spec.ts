import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let showProfile: ShowProfileService

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show user profile', async () => {
    const createdUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const returnedUser = await showProfile.execute({
      user_id: createdUser.id,
    })

    expect(returnedUser.name).toBe('John Doe')
    expect(returnedUser.email).toBe('johndoe@example.com')
  })

  it('should not be able to show a non-existent user profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existent',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
