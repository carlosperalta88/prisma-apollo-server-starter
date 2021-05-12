import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import verifyToken from './verifyToken'

export interface Context {
  prisma: PrismaClient,
  auth: any
}

const prisma:PrismaClient = new PrismaClient()

export const context = async ({ req }: {req: Request}) => {
  let isAuthenticated:boolean = false
    try {
      const authHeader = req.headers.authorization || ''
      if (authHeader) {
        const token = authHeader.split(' ')[1]
        const payload = await verifyToken(token)
        isAuthenticated = payload ? true : false
      }
    } catch (error) {
      console.error(error)
    }
    return { req, auth: { isAuthenticated }, prisma }
}