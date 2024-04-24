module.exports.Query = {
  hello: () => {
    return "Hello World!";
  },
  products: (_, { filter }, { db }) => {
    const { onSale, avgRating } = filter;
    let filteredProducts = db.productData;
    if (filter) {
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      } else {
        filteredProducts = filteredProducts.filter(
          (product) => !product.onSale
        );
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumrating = 0;
          let numberofReviews = 0;
          db.reviews.forEach((element) => {
            if (element.productId === product.id) {
              sumrating += element.rating;
              numberofReviews++;
            }
          });
          const avg = sumrating / numberofReviews;
          return avg >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
  product: (_, args, { db }) => {
    return db.productData.find((product) => product.id === args.id);
  },
  categories: (_, _2, { db }) => {
    return db.categories;
  },
  category: (_, args, { db }) => {
    return db.categories.find((category) => category.id === args.id);
  },
};
