import { GraphQLServer } from 'graphql-yoga'

// Scalar Types - String, Boolean, Int, Float, ID

const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`

const resolvers = {
  Query: {
    id() {
      return 'abc123' // ID type can be a number but is convert to a stirng
    },
    name() {
      return 'Jason'
    },
    age() {
      return 29
    },
    employed() {
      return false
    },
    gpa() {
      return null // to show want a non-bang is allow to do have null values
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
  console.log('The server is up!')
})
