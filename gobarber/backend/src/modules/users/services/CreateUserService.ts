import { hash } from 'bcryptjs'
import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const verifyExistentUser = await this.usersRepository.findByEmail(email)

    if (verifyExistentUser) {
      throw new AppError('Email address already used')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}
