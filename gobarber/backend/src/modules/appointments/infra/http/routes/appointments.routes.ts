import { Router } from 'express'

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
