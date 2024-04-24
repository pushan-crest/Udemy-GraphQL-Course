import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "./schema";
import { PubSub } from "graphql-subscriptions";

import { createServer } from "http";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

const pubsub = new PubSub();
const yoga = createYoga({
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: {
      Query,
      Mutation,
      Subscription,
      User,
      Post,
      Comment,
    },
  }),
  context: {
    db,
    pubsub,
    test: {
      message: "test",
    },
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
