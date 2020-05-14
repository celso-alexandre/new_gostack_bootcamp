import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProvidersService from '@modules/appointments/services/ListProvidersService'

export default class ListProvidersontroller {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: loggedInProvider } = request.user
    const listProviders = container.resolve(ListProvidersService)

    const providers = await listProviders.execute({
      loggedInUserIdToExclude: loggedInProvider,
    })

    return response.json(providers)
  }
}
