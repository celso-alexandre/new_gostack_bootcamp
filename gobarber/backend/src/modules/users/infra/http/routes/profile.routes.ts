import { Router } from 'express'

import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter
