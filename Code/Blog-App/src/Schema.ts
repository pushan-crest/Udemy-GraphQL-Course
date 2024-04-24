import { gql } from "apollo-server";

export const typeDefs = gql`
  # ============== Schema =================

  type Query {
    me: User
    posts: [Post!]!
    profile(userId: ID!): Profile
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    Published: Boolean!
    createdAt: String!
    author: User!
  }

  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
  }

  type Profile {
    id: ID!
    bio: String
    user: User
    isMyProfile: Boolean!
  }

  type UserErr {
    message: String!
  }

  # post payload to pass data in post
  type PostPayload {
    userErr: [UserErr!]!
    post: Post
    message: String!
  }

  type AuthPayload {
    userErr: [UserErr!]!
    token: String
    message: String!
  }

  # ============== Inputs =================

  input PostInput {
    title: String
    content: String
  }

  input Credentials {
    email: String!
    password: String!
  }

  # ============== Mutations =================

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
    postPublish(postId: ID!): PostPayload!
    postUnpublish(postId: ID!): PostPayload!
    signUp(credentials: Credentials, name: String!, bio: String!): AuthPayload!
    signIn(credentials: Credentials): AuthPayload!
  }
`;
