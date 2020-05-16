import { Router } from 'express'

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.post('/', appointmentsController.create)
appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter
