import { Router } from 'express'

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/appointments', ensureAuthenticatedMiddleware, appointmentsRouter)

export default routes
