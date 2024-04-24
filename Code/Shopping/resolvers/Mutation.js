const { v4: uuid } = require("uuid");

exports.Mutation = {
  // ====================== add methods =====================

  addCategory: (_, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name: name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },

  addProduct: (_, { input }, { db }) => {
    const { name, description, quantity, price, onSale, categoryId } = input;
    const newProduct = {
      id: uuid(),
      name: name,
      description: description,
      quantity: quantity,
      price: price,
      onSale: onSale,
      categoryId: categoryId,
    };

    console.log(newProduct);
    db.productData.push(newProduct);
    return newProduct;
  },

  addReview(_, { input }, { db }) {
    const { title, date, comments, rating, productId } = input;
    const newReview = {
      id: uuid(),
      title: title,
      date: date,
      comments: comments,
      rating: rating,
      productId: productId,
    };
    console.log(newReview);
    db.reviews.push(newReview);
    return newReview;
  },

  // ====================== delete methods =====================

  deleteCategory(_, { id }, { db }) {
    const index = db.categories.findIndex((category) => category.id === id);
    db.categories.splice(index, 1);

    // changin the productId's categoryId to Null that are associated with that category
    db.productData = db.productData.map((product) => {
      if (product.categoryId === id) {
        product.categoryId = null;
      }
    });
    console.log(productData);
    return productData;
  },

  deleteProduct(_, { id }, { db }) {
    const index = db.productData.findIndex((product) => product.id === id);
    db.productData.splice(index, 1);

    // filter the reviews that does not belong to this product
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    console.log(productData);
    return productData;
  },

  deleteReview(_, { id }, { db }) {
    const index = db.reviews.findIndex((review) => review.id === id);
    reviews.splice(index, 1);
    return true;
  },

  // ====================== update methods =====================

  updateCategory(_, { id, input }, { db }) {
    const { name } = input;
    const index = db.categories.findIndex((category) => category.id === id);

    if (index === -1) {
      console.log("product not found");
    } else {
      db.categories[index] = { ...db.categories[index], ...input };
    }

    return db.categories[index];
  },

  updateProducts(_, { id, input }, { db }) {
    const { name, description, quantity, price, onSale, categoryId } = input;
    const index = db.productData.findIndex((product) => product.id === id);

    if (index === -1) {
      console.log("product not found");
    } else {
      db.productData[index] = { ...db.productData[index], ...input };
    }

    return db.productData[index];
  },

  updateReviews(_, { id, input }, { db }) {
    const { title, date, comments, rating, productId } = input;
    const index = db.reviews.findIndex((review) => review.id === id);
    if (index === -1) {
      console.log("product not found");
    } else {
      db.reviews[index] = { ...db.reviews[index], ...input };
    }
    return db.reviews[index];
  },
};
