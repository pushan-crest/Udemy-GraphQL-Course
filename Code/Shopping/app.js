const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./Schema");
const { db } = require("./db");
const { Query } = require("./resolvers/Query");
const { Product } = require("./resolvers/Product");
const { Category } = require("./resolvers/Category");
const { Mutation } = require("./resolvers/Mutation");

// =================================================================

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
    Mutation,
  },
  context: {
    db,
  },
});

server.listen(3000).then(({ url }) => {
  console.log("server is running at :  " + url);
});

// =================================================================
