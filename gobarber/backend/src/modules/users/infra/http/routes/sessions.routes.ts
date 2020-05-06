import { Router } from 'express'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const sessionRouter = Router()

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const usersRepository = new UsersRepository()

  const authenticatedUser = new AuthenticateUserService(usersRepository)

  const { user, token } = await authenticatedUser.execute({
    email,
    password,
  })

  delete user.password

  return response.json({ user, token })
})

export default sessionRouter
