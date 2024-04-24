const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    # defining scaler types
    hello: String
    quantity: Int
    price: Float
    isgood: Boolean

    # this field cannot be null
    name: String!

    # Array types - cannot hold null values and cannot be null
    favourites: [String!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    quantity: () => {
      return 10;
    },
    price: () => {
      return 100.1;
    },
    isgood: () => {
      return true;
    },

    name: () => {
      return "Pushan";
    },

    favourites: () => {
      return ["Apple", "Banana", "Mango"];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000).then(({ url }) => {
  console.log("server is running at :  " + url);
});
