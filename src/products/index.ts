import {
  objectType,
  inputObjectType,
  asNexusMethod
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from '../context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const ProductType = objectType({
  name: 'ProductType',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.string('name')
  }
})

export const Products = objectType({
  name: 'Products',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.boolean('active')
    t.string('version')
    t.int('price')
    t.int('typeId')
    t.field('type',  { type: 'ProductType',
    resolve: async(parent, _, context: Context) => {
      return await context.prisma.productType.findUnique({
        where: { id: parent.typeId! }
      })
    }
    })
    t.int('subscriptionTypeId')
    t.field('subscriptionType', { type: 'SubscriptionType',
    resolve: async (parent, _, context: Context) => {
      return await context.prisma.subscriptionType.findUnique({
        where: { id: parent.subscriptionTypeId! }
      })
    }
  })
    t.list.field('users', { type: 'Users' })
    t.list.field('media', { type: 'Media' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})

export const ProductsInput = inputObjectType({
  name: 'ProductsInput',
  definition(t) {
    t.int('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.int('typeId')
    t.int('subscriptionTypeId')
    t.nonNull.string('version')
    t.nonNull.int('price')
    t.list.field('media', { type: 'MediaInput' })
  }
})

export const ProductTypeInput = inputObjectType({
  name: 'ProductTypeInput',
  definition(t) {
    t.nonNull.string('name')
  }
})