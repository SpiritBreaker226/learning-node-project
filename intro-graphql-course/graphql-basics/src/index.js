import { GraphQLServer } from 'graphql-yoga'

const users = [
  {
    id: "1",
    name: "Jason",
    email: "jason@example.com",
  },
  {
    id: "2",
    name: "Jade",
    email: "jade@example.com",
    age: 25,
  },
  {
    id: "3",
    name: "Bill",
    email: "bill@example.com",
    age: 35,
  },
  {
    id: "4",
    name: "Sarah",
    email: "sarah@example.com",
  },
]


const typeDefs = `
  type Query {
    users: [User!]!
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
    users(parent, args, ctx, info) {
      return users
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
