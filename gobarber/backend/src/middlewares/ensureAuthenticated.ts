import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'

import AppError from '../errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function unsureAuthenticated(
  request: Request,
  reponse: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const { secret } = authConfig.jwt

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, secret)

    const { sub } = decoded as TokenPayload
    request.user = {
      id: sub,
    }

    if (decoded) {
      return next()
    } else {
      throw new AppError('Invalid JWT Token', 401)
    }
  } catch (err) {
    throw new AppError('Invalid JWT Token', 401)
  }
}
