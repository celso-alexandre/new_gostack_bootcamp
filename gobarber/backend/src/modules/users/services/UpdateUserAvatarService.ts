import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import uploadConfig from '@config/upload'
import User from '@modules/users/infra/typeorm/entities/User'

import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      const userAvatarFileExistsInDisk = fs.existsSync(userAvatarFilePath)

      if (userAvatarFileExistsInDisk) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await this.usersRepository.save(user)

    delete user.password

    return user
  }
}

export default UpdateUserAvatarService
