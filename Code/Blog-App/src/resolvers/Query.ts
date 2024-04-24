import { Context } from "..";

export const Query = {
  me: (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },

  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      where: {
        Published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },

  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma, userInfo }: Context
  ) => {
    try {
      const isMyProfile = Number(userId) === userInfo?.userId;

      const user = await prisma.profile.findUnique({
        where: {
          userId: Number(userId), // Use 'id' instead of 'userId'
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return {
        ...user,
        isMyProfile,
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },
};
