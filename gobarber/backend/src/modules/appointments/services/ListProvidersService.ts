import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  loggedInUserIdToExclude: string
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ loggedInUserIdToExclude }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${loggedInUserIdToExclude}`
    )

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        loggedInUserIdToExclude,
      })

      await this.cacheProvider.save(
        `providers-list:${loggedInUserIdToExclude}`,
        users
      )
    }

    return users
  }
}
