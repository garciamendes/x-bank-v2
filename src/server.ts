// Third party
import fastifyLib from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'

// Local
import { env } from './env'

export const fastify = fastifyLib()

fastify.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

// fastify.register(usersRoutes)

fastify.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})