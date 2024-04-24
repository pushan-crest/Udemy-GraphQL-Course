import { Context } from "..";

interface UserParentType {
  id: number;
}

export const User = {
  posts: (parent: UserParentType, __: any, { prisma, userInfo }: Context) => {
    const isOwnProfile = parent.id === userInfo?.userId;
    if (isOwnProfile) {
      console.log(parent.id);

      const user_posts = prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
      return user_posts;
    } else {
      return prisma.post.findMany({
        where: {
          authorId: parent.id,
          Published: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    }
  },
};
