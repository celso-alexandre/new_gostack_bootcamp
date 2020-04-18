import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'

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
    throw new Error('JWT token is missing')
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
      throw new Error('Invalid JWT Token')
    }
  } catch (err) {
    throw new Error('Invalid JWT Token')
  }
}
