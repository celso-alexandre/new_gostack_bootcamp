import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import UsersController from '@modules/users/infra/http/controllers/UsersController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()
const upload = multer(uploadConfig)
const userAvatarController = new UserAvatarController()

usersRouter.post('/', usersController.create)

usersRouter.use(ensureAuthenticated)

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRouter
