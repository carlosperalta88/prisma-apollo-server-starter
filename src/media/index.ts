import {
  objectType,
  inputObjectType,
  asNexusMethod,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const MediaType = objectType({
  name: 'MediaType',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.string('name')
  }
})

export const MediaInput = inputObjectType({
  name: 'MediaInput',
  definition(t) {
    t.nonNull.string('url')
  }
})

export const Media = objectType({
  name: 'Media',
  definition(t) {
    t.nonNull.string('url')
  }
})

export const MediaTypeInput = inputObjectType({
  name: 'MediaTypeInput',
  definition(t) {
    t.nonNull.string('name')
  }
})