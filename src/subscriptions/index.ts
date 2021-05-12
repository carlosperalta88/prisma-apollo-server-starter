import {
  objectType,
  inputObjectType,
  asNexusMethod,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from '../context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const SubscriptionType = objectType({
  name: 'SubscriptionType',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.string('name')
    t.int('price')
  }
})

export const Subscriptions = objectType({
  name: 'Subscriptions',
  definition(t) {
    t.nonNull.int('id')
    t.boolean('active')
    t.int('subscriptionTypeId')
    t.field('type', { type: 'SubscriptionType',
    resolve: (parent, _, context: Context) => {
      return context.prisma.subscriptionType.findUnique({
        where: { id: parent.subscriptionTypeId! }
      })
    }
  })
    t.int('userId')
    t.field('users', { type: 'Users',
    resolve: (parent, _, context: Context) => {
      return context.prisma.users.findUnique({
        where: { id: parent.userId! }
      })
    }
  })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})

export const SubscriptionsInput = inputObjectType({
  name: 'SubscriptionsInput',
  definition(t) {
    t.boolean('active')
    t.nonNull.int('subscriptionTypeId')
    t.nonNull.int('userId')
  }
})

export const SubscriptionTypeInput = inputObjectType({
  name: 'SubscriptionTypeInput',
  definition(t) {
    t.nonNull.string('name')
    t.int('price')
  }
})