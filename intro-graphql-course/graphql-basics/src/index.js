import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello: String!
  }
`
const resolvers = {
  Query: {
    hello() {
      return 'This ia my first query!'
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
  console.log('The server is up!')
})
