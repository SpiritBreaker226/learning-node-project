import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`

const resolvers = {
  Query: {
    hello() {
      return 'This ia my first query!'
    },
    name() {
      return 'Jason'
    },
    location() {
      return 'Montreal'
    },
    bio() {
      return 'There is no bio'
    },
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
  console.log('The server is up!')
})
