import { Context } from "..";

interface profileParentType {
  userId: number;
}

export const Profile = {
  user: (parent: profileParentType, __: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: {
        id: Number(parent.userId),
      },
    });
  },
};
