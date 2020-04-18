import { Router } from 'express'

import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import ensureAuthenticatedMiddleware from '../middlewares/ensureAuthenticated'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/appointments', ensureAuthenticatedMiddleware, appointmentsRouter)

export default routes
