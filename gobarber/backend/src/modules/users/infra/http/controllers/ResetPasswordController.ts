import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ResetForgotPasswordService from '@modules/users/services/ResetPasswordService'

export default class ForogotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body

    const resetForgotPasswordService = container.resolve(
      ResetForgotPasswordService
    )

    await resetForgotPasswordService.execute({ token, password })

    return response.status(204).json()
  }
}
