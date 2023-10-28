const Product = require("../models/product");

const createProduct = async (req, res) => {
  const product = new Product({
    name: "product 1",
    owner: req.user._id,
    category: "sport",
    color: "red",
  });
  const resualt = await product.save();
  res.status(201).json(resualt);
};

module.exports = {
  createProduct,
};
