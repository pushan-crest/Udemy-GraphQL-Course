exports.Product = {
  category: (parent, _, { db }) => {
    return db.categories.find((category) => category.id === parent.categoryId);
  },
  reviews: ({ id }, _, { db }) => {
    return db.reviews.filter((review) => review.productId === id);
  },
};
