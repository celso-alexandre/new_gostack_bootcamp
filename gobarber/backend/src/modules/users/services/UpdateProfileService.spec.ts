import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
    })

    expect(updatedUser.name).toBe('John Tre')
    expect(updatedUser.email).toBe('johntre@example.com')
  })

  it('should not be able to change to another existing user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe Original',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'John Doe Fake',
      email: 'test@example.com',
      password: '123456',
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe Fake',
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      old_password: '123456',
      password: '123123',
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('should not be able to update the password without providing old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password by providing wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update an unexistent user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existent-id',
        name: 'John Doe',
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
