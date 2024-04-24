import { Context } from "..";

interface canUserMutatePostParams {
  userId: number;
  postId: number;
  prisma: Context["prisma"];
}

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: canUserMutatePostParams) => {
  // find user
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // if user not found
  if (!user) {
    return {
      userErr: [
        {
          message: "User does not exist",
        },
      ],
      post: null,
      message: "User does not exist",
    };
  }

  // find post
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  // check if post authorid is not equal to userid
  if (user.id !== post?.authorId) {
    return {
      userErr: [
        {
          message: "You are not the author of this post",
        },
      ],
      post: null,
      message: "You are not the author of this post",
    };
  }
};
