import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import UpdateUserAvatarService from './UpdateUserAvatarService'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUseravatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateUseravatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )
  })

  it('should be able to update an user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joghn Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const updateUser = await updateUseravatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(updateUser.avatar).toBe('avatar.jpg')
  })

  it('should be able to update an user avatar that already has an avatar, by deleting the old one avatar first', async () => {
    const deletefile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({
      name: 'Joghn Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await updateUseravatar.execute({
      user_id: user.id,
      avatarFilename: 'old_avatar.jpg',
    })

    await updateUseravatar.execute({
      user_id: user.id,
      avatarFilename: 'new_avatar.jpg',
    })

    expect(deletefile).toHaveBeenCalledWith('old_avatar.jpg')
    expect(user.avatar).toBe('new_avatar.jpg')
  })

  it('should not be able to update avatar of a non-existent user', async () => {
    await expect(
      updateUseravatar.execute({
        user_id: 'non-existent',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
