import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.get('/', profileController.show)
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update
)

export default profileRouter
