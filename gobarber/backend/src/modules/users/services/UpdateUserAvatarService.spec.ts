import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

describe('UpdateUserAvatar', () => {
  it('should be able to update an user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUseravatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

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
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const deletefile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUseravatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    const user = await fakeUsersRepository.create({
      name: 'Joghn Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await updateUseravatar.execute({
      user_id: user.id,
      avatarFilename: 'old_avatar.jpg',
    })

    const updateUser = await updateUseravatar.execute({
      user_id: user.id,
      avatarFilename: 'new_avatar.jpg',
    })

    expect(deletefile).toHaveBeenCalledWith('old_avatar.jpg')
    expect(user.avatar).toBe('new_avatar.jpg')
  })

  it('should not be able to update avatar of a non-existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUseravatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    await expect(
      updateUseravatar.execute({
        user_id: 'non-existent',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
