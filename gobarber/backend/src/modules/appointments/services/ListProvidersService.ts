import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  loggedInUserIdToExclude: string
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ loggedInUserIdToExclude }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      loggedInUserIdToExclude,
    })

    return users
  }
}
