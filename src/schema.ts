import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  arg,
  asNexusMethod,
  enumType,
  list,
  booleanArg
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import { AuthenticationError } from 'apollo-server-errors'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

import { UserStatus, UserStatusInput, Users, UsersInput } from './users'
import { SubscriptionType, SubscriptionTypeInput, Subscriptions, SubscriptionsInput } from './subscriptions'
import { ProductType, ProductTypeInput, Products, ProductsInput } from './products'
import { Media, MediaInput, MediaType, MediaTypeInput } from './media'

const Query = objectType({
  name: 'Query',
  description: `Queries for user/service/product relationships.`,
  definition(t) {
    t.list.field('allUsers', {
      description: 'Get all the users and can be paginated',
      type: 'Users',
      args: {
        take: intArg(),
        skip: intArg(),
        id: intArg()
      },
      resolve: async (_parent, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.users.findMany({
          take: args.take || 1,
          skip: args.skip || 0,
          cursor: {
            id: args.id || 1
          }
        })
      }
    })

    t.field('userById', {
      type: 'Users',
      description: 'Gets an user by id. Will include products and subscriptions.',
      args: {
        id: intArg()
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.users.findUnique({
          where: { id: args.id || undefined },
          include: {
            products: true,
            subscriptions: true
          }
        })
      }
    })

    t.list.field('getAllProducts', {
      type: 'Products',
      description: `Gets a list of products paginated. It's cursor based pagination, 
      so you must provide the last element id for the next page.`,
      args: {
        take: intArg(),
        skip: intArg(),
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.products.findMany({
          take: args.take || 1,
          skip: args.skip || 0,
          cursor: {
            id: args.id || 1
          }
        })
      }
    })

    t.field('productById', {
      type: 'Products',
      description: 'Gets a product by id with the associated media if any.',
      args: {
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.products.findUnique({
          where: { id: args.id || undefined },
          include: {
            media: true
          }
        })
      }
    })

    t.list.field('getAllSubscriptions', {
      type: 'Subscriptions',
      description: `Gets all the active subscriptions with it's users and type.`,
      args: {
        active: booleanArg()
      },
      resolve: async (_p, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.subscriptions.findMany({
          where: { active: args.active! },
          include: {
            users: true, 
            type: true
          }
        })
      }
    })


  }
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('addUserStatus', {
      type: 'UserStatus',
      description: `Creates user status`,
      args: {
        data: nonNull(
          arg({
            type: 'UserStatusInput'
          })
        )
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.userStatus.create({
          data: {
            name: args.data.name
          }
        })
      }
    })

    t.nonNull.field('addSubscriptionType', {
      type: 'SubscriptionType',
      description: `Creates subscription types (premium, free, etc)`,
      args: {
        data: nonNull(
          arg({
            type: 'SubscriptionTypeInput'
          })
        )
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.subscriptionType.create({
          data: {
            name: args.data.name
          }
        })
      }
    })

    t.nonNull.field('addProductType', {
      type: 'ProductType',
      description: `Creates product type (masterclass, etc)`,
      args: {
        data: nonNull(
          arg({
            type: 'ProductTypeInput'
          })
        )
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.productType.create({
          data: {
            name: args.data.name
          }
        })
      }
    })

    t.nonNull.field('addMediaType', {
      type: 'MediaType',
      description: `Which type of media are you saving? PDF, video, etc.`,
      args: {
        data: nonNull(
          arg({
            type: 'MediaTypeInput'
          })
        )
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.mediaType.create({
          data: {
            name: args.data.name
          }
        })
      }
    })

    t.nonNull.field('createUser', {
      type: 'Users',
      description: `Creates a new user`,
      args: {
        data: nonNull(
          arg({
            type: 'UsersInput'
          })
        )
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.users.create({
          data: {
            email: args.data.email,
            phone: args.data.phone
          }
        })
      }
    })

    t.field('createProduct', {
      type: 'Products',
      description: `Adds new product`,
      args: {
        data: nonNull(
          arg({
            type: 'ProductsInput'
          })
        ),
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        const media = args.data.media?.map((m) => {
          return { url: m?.url! }
        })
        return await context.prisma.products.create({
          data: {
            name: args.data.name,
            description: args.data.description,
            type: {
              connect: {
                id: args.data.typeId!
              }
            },
            subscriptionType: {
              connect: {
                id: args.data.subscriptionTypeId || undefined
              }
            },
            version: args.data.version,
            price: args.data.price,
            media: {
              createMany: {
                data: media!
              }
            }
          },
          include: {
            media: true
          }
        })
      }
    })

    t.nonNull.field('productPurchasedByUser', {
      type: 'Users',
      description: `Add purchased product by user to it's account.`,
      args: {
        userId: intArg(),
        productId: intArg()
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.users.update({
          where: { id: args.userId! },
          data: {
            products: {
              connect: { id: args.productId! }
            }
          }
        })
      }
    })

    t.nonNull.field('createSubscription', {
      type: 'Subscriptions',
      description: `A subscription is the relationship between an user and a subscription id which will define how often do you need
      to charge him and how much.`,
      args: {
        data: nonNull(
          arg({
            type: 'SubscriptionsInput',
          }),
        ),
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.subscriptions.create({
          data: {
            type: {
              connect: { id: args.data.subscriptionTypeId! }
            },
            users: {
              connect: { id: args.data.userId }
            }
          }
        })
      }
    })

    t.nonNull.field('updateUser', {
      type: 'Users',
      description: `Adds more data to the user profile`,
      args: {
        data: nonNull(
          arg({
            type: 'UsersInput',
          }),
        ),
      },
      resolve: async (_, args, context: Context) => {
        if (!context.auth.isAuthenticated) {
          throw new AuthenticationError('NOT LOGGED IN')
        }
        return await context.prisma.users.update({
          where: { email: args.data.email },
          data: {
            firstName: args.data.firstName!,
            lastName: args.data.lastName!,
            dob: args.data.dob,
            active: args.data.active || true,
          }
        })
      }
    })
    
  }
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})


export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Users,
    UsersInput,
    UserStatus,
    UserStatusInput,
    Subscriptions,
    SubscriptionType,
    SubscriptionTypeInput,
    Products,
    ProductType,
    ProductTypeInput,
    Media,
    MediaInput,
    MediaType,
    MediaTypeInput,
    UsersInput,
    SubscriptionsInput,
    ProductsInput,
    DateTime
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
})