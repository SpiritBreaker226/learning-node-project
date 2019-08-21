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
