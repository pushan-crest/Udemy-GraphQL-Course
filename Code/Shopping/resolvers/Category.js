exports.Category = {
  products: (parent, { filter }, { db }) => {
    const { onSale, avgRating } = filter;
    let filteredProducts = db.productData.filter(
      (product) => product.categoryId === parent.id
    );
    if (filter) {
      if (onSale === true) {
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
          reviews.forEach((element) => {
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
};
