import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import AppError from '@shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const verifyExistentUser = await this.usersRepository.findByEmail(email)

    if (verifyExistentUser) {
      throw new AppError('Email address already used')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.cacheProvider.invalidateByPrefix('providers-list')

    return user
  }
}
