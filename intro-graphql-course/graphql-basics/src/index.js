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

const posts = [
  {
    id: "1",
    title: "Deamon",
    body: "Very Good Book",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "Bad Blood",
    body: "About Blood",
    published: false,
    author: "2",
  },
  {
    id: "3",
    title: "Fear and Loathing",
    body: "Something to do with Las Vegas",
    published: true,
    author: "4",
  },
]

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    author: User!
  }
`

const resolvers = {
  Query: {
    users(parent, {query}, ctx, info) {
      if(query) {
        return users.filter((user) => (
          user.name.toLowerCase().includes(query.toLowerCase())
        ))
      }

      return users
    },
    posts(parent, {query}, ctx, info) {
      if (query) {
        return posts.filter((post) => (
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
        ))
      }

      return posts
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
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      // parent is the valuable being called
      return users.find(user => user.id === parent.author)
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
  console.log('The server is up!')
})
