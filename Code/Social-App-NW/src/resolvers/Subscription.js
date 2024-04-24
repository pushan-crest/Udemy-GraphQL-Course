const Subscription = {
  count: {
    subscribe: async function (parent, args, ctx, info) {
      let count = 0;
      const { pubsub } = ctx;
      console.log(pubsub);
      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count,
        });
      }, 1000);

      return pubsub.asyncIterator("count");
    },
  },

  comment: {
    subscribe(parent, { postId }, ctx, info) {
      const { db, pubsub } = ctx;
      const post = db.posts.find(
        (post) => post.id === postId && post.published
      );

      if (!post) {
        throw new Error("Post not found");
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },

  // comment: {
  //   subscribe: async function (parent, { postId }, ctx, info) {
  //     console.log("listening...", postId);
  //     const { db, pubsub } = ctx;
  //     const post = db.posts.find(
  //       (post) => post.id === postId && post.published
  //     );

  //     if (!post) {
  //       throw new Error("Post not found");
  //     }

  //     return pubsub.asyncIterator(`comment ${postId}`);
  //   },
  // },
};

export { Subscription as default };
