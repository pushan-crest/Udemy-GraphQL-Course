import { Context } from "..";
import { userLoader } from "../loaders/userLoader";

interface PostParentType {
  authorId: number;
}

export const Post = {
  author: (parent: PostParentType, __: any, { prisma }: Context) => {
    return userLoader.load(parent.authorId);
  },
};
