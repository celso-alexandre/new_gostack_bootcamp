import { Request, Response, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'

import AppError from '@shared/errors/AppError'

import cacheConfig from '@config/cache'

const { host, port, password } = cacheConfig.config.redis

const redisClient = redis.createClient({
  host,
  port: Number(port),
  password,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter:',
  points: 10,
  duration: 5,
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
