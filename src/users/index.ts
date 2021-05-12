import {
  objectType,
  inputObjectType,
  asNexusMethod,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from '../context'
import { AuthenticationError } from 'apollo-server-errors'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const Users = objectType({
  name: 'Users',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.string('firstName')
    t.nullable.string('lastName')
    t.nullable.string('dob')
    t.nonNull.string('email')
    t.nullable.int('phone')
    t.nullable.boolean('active')
    t.nullable.int('statusId')
    t.field('status', { type: 'UserStatus',
    resolve: (parent, _, context: Context) => {
      return context.prisma.userStatus.findUnique({
        where: { id: parent.statusId! }
      })
    } 
  })
    t.field('subscriptions', { type: 'Subscriptions' })
    t.list.field('products', { type: 'Products' })
  }
})

export const UsersInput = inputObjectType({
  name: 'UsersInput',
  definition(t) {
    t.nullable.string('firstName')
    t.nullable.string('lastName')
    t.nullable.string('dob')
    t.nonNull.string('email')
    t.nonNull.int('phone')
    t.nullable.boolean('active')
    t.nullable.int('statusId')
    t.field('status', { type: 'UserStatusInput' })
    t.field('subscriptions', { type: 'SubscriptionsInput' })
    t.list.field('products', { type: 'ProductsInput' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})

export const UserStatusInput = inputObjectType({
  name: 'UserStatusInput',
  definition(t) {
    t.nonNull.string('name')
  }
})

export const UserStatus = objectType({
  name: 'UserStatus',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.string('name')
  }
})