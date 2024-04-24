const { gql } = require("apollo-server");

exports.typeDefs = gql`
  ################## Types #############################

  type Query {
    hello: String
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId: ID!
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comments: String!
    rating: Int!
    productId: ID!
  }

  ################## Mutations #############################

  type Mutation {
    addCategory(input: addCategoryInput!): Category!
    addProduct(input: addProductInput!): Product!
    addReview(input: addReviewInput!): Review!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!, input: updateCategoryInput): Category!
    updateProducts(id: ID!, input: updateProductInput): Product!
    updateReviews(id: ID!, input: updateReviewInput): Review!
  }

  ################## Inputs #############################

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input addCategoryInput {
    name: String!
  }

  input addProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId: ID!
  }

  input addReviewInput {
    id: String
    title: String!
    date: String!
    comments: String!
    rating: Int!
    productId: ID!
  }

  input updateCategoryInput {
    name: String!
  }

  input updateProductInput {
    name: String
    description: String
    quantity: Int
    price: Float
    onSale: Boolean
    categoryId: ID
  }

  input updateReviewInput {
    title: String
    date: String
    comments: String
    rating: Int
    productId: ID
  }
`;
