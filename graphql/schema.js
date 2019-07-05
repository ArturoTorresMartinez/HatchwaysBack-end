const { buildSchema } = require('graphql');

//Also defining schemas, that's why I love GraphQL!
module.exports = buildSchema(`
type Post {
    _id: ID!
    title: String!
    content: String!
    creator: String!
    createdAt: String!
    updatedAt: String!
}

type PostData {
    posts: [Post!]!
    totalPosts: Int!
}

input PostInputData {
    title: String!
    content: String!
    creator: String!
}

type RootQuery {
    hello: String!
    posts: PostData!
    post(id: ID!): Post!
}

type RootMutation {
    createPost(postInput: PostInputData): Post!
    updatePost(id: ID!, postInput: PostInputData): Post!
    deletePost(id: ID!): Boolean
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);