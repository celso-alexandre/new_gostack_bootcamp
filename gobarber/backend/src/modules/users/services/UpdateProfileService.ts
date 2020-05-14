import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Provided user was not found')
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

    if (
      user.email !== email &&
      email &&
      userWithUpdatedEmail &&
      userWithUpdatedEmail.id !== user.id
    ) {
      throw new AppError('Email already in use')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError(
        'Attemped to change password without providing an old one'
      )
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      )

      if (!checkOldPassword) {
        throw new AppError('Invalid old password')
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.save(user)
  }
}