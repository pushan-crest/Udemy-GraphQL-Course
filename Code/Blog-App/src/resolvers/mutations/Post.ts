import { Post } from "@prisma/client";
import { Context } from "../../index";
import { canUserMutatePost } from "../../utils/canUserMutatePost";

interface PostArgs {
  post: { title?: string; content?: string };
}

interface PostPayloadType {
  userErr: {
    message: string;
  }[];
  post: Post | null;
  message: string;
}

export const postResolvers = {
  // ============ Creating a Post ==========
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    // check for authorisation
    if (!userInfo) {
      return {
        userErr: [
          {
            message: "You must be logged in to create a post",
          },
        ],
        post: null,
        message: "Not Created",
      };
    }
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErr: [
          {
            message: "Title and content are required",
          },
        ],
        post: null,
        message: "Not Created",
      };
    }
    const Post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userInfo.userId,
      },
    });

    return {
      userErr: [],
      post: Post,
      message: "Post Created Successfully",
    };
  },

  // ========== post update ===================
  postUpdate: async (
    _: any,
    { postId, post }: { postId: string; post: PostArgs["post"] },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    // check for authorisation
    if (!userInfo) {
      return {
        userErr: [
          {
            message: "You must be logged in to create a post",
          },
        ],
        post: null,
        message: "Not Created",
      };
    }

    // can user mutate post
    const mutationError = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });

    if (mutationError) {
      return {
        userErr: [{ message: mutationError.message }],
        post: null,
        message: "Not Updated",
      };
    }

    const { title, content } = post;
    if (!title && !content) {
      return {
        userErr: [
          {
            message: "Need to provide any one updation field",
          },
        ],
        post: null,
        message: "Not Updated",
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!existingPost) {
      return {
        userErr: [
          {
            message: "Post does not exist",
          },
        ],
        post: null,
        message: "Not Updated",
      };
    }

    return {
      userErr: [],
      post: await prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          title: title || existingPost.title,
          content: content || existingPost.content,
        },
      }),
      message: "Post Updated Successfully",
    };
  },

  // ========== post Delete ===================
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    // check for authorisation
    if (!userInfo) {
      return {
        userErr: [
          {
            message: "You must be logged in to create a post",
          },
        ],
        post: null,
        message: "Not Created",
      };
    }

    // can user mutate post
    const mutationError = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });

    if (mutationError) {
      return {
        userErr: [{ message: mutationError.message }],
        post: null,
        message: "Not Updated",
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return {
        userErr: [
          {
            message: "Post does not exist",
          },
        ],
        post: null,
        message: "Not Deleted",
      };
    }

    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    return {
      userErr: [],
      post,
      message: "Post Deleted Successfully",
    };
  },

  // ========== post Publish ===================
  postPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    // check for authorisation
    if (!userInfo) {
      return {
        userErr: [
          {
            message: "You must be logged in to create a post",
          },
        ],
        post: null,
        message: "Not Created",
      };
    }

    // can user mutate post
    const mutationError = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });

    if (mutationError) {
      return {
        userErr: [{ message: mutationError.message }],
        post: null,
        message: "Not Updated",
      };
    }
    return {
      userErr: [],
      post: await prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          Published: true,
        },
      }),
      message: "Post Published Successfully",
    };
  },

  // ========== post Unpublish ===================
  postUnpublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    // check for authorisation
    if (!userInfo) {
      return {
        userErr: [
          {
            message: "You must be logged in to create a post",
          },
        ],
        post: null,
        message: "Not Created",
      };
    }

    // can user mutate post
    const mutationError = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });

    if (mutationError) {
      return {
        userErr: [{ message: mutationError.message }],
        post: null,
        message: "Not Updated",
      };
    }
    return {
      userErr: [],
      post: await prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          Published: false,
        },
      }),
      message: "Post Published Successfully",
    };
  },
};
