import { Router } from 'express'

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'

const providersRouter = Router()
const providersController = new ProvidersController()

providersRouter.get('/', providersController.index)

export default providersRouter
