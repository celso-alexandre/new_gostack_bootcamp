import { Router } from 'express'

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'

const providersRouter = Router()
const providersController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

providersRouter.get('/', providersController.index)
providersRouter.post(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
)
providersRouter.post(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
)

export default providersRouter
