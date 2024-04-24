import { postResolvers } from "./Post";
import { auth } from "./Auth";

export const Mutation = {
  ...postResolvers,
  ...auth,
};
