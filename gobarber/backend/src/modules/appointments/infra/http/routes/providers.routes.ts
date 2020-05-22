import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'

const providersRouter = Router()
const providersController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

providersRouter.get('/', providersController.index)
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.QUERY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index
)
providersRouter.post(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.QUERY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index
)

export default providersRouter
