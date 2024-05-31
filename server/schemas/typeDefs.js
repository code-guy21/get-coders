const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isContractor: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    becomeContractor(username: String!, isContactor: Boolean): User
  }
`;

module.exports = typeDefs;