import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): Float!
    greeting(name: String, position: String): String!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

const resolvers = {
  Query: {
    add(parent, {a, b}, ctx, info) {
      return a + b
    },
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favourite ${args.position}`
      }

      return "Hello!"
    },
    me() {
      return {
        id: "123098",
        name: "Jason",
        email: "jason@example.com",
      }
    },
    post() {
      return {
        id: "4321",
        title: "The Art of War",
        body: "Too Long",
        published: true,
      }
    }
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
  console.log('The server is up!')
})
