const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    imageId: image!
    feature: [GroupFeatures!]!
    hasCar(id: ID!): Boolean!
    car(skip: Int!, take: Int!): [Car!]!
    featureSet: GroupFeatureSet
    name: String!
    description: String!
  }

  type image {
    id: ID!
    url: String!
  }

  type GroupFeatures {
    features: GroupFeatureFields!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeatureSeperately: Boolean!
  }

  enum GroupFeatureFields {
    INLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }

  type mutation {
    groupDelete(groupId: ID!): Boolean!
    publish(groupId: ID!): Boolean!
    unpublish(groupId: ID!): Boolean!
    addCar(groupId: ID!, carId: ID!): Boolean!
    removeCars(groupId: ID!, carId: ID!): Boolean!
    create(
      name: String! 
      image: ImageInput!
      description: String!
      featureSet: GroupFeatureSet!
    ): Boolean!
    update(groupId: ID!, groupInput: GroupInput!): GroupUpdatePayload
  }

  type GroupUpdatePayload {
    userErrors: [Int]!
    group: Group!
  }

  type UserErrors {
    messgae: String!
    field: [String!]!
  }

  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureSet
  }

  input ImageInput {
    url: String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
