import { injectable, inject } from 'tsyringe'

//import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

import IUserTokensRepository from '../repositories/IUserTokensRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    await this.userTokensRepository.generate(user.id)

    this.mailProvider.sendMail(email, 'Password recovery request received.')
  }
}