const { default: mongoose } = require("mongoose");

const ProductSchema = mongoose.Schema({
  _id: Number,
  brand: String,
  name: String,
  price: String,
  price_sign: String,
  currency: String,
  image_link: String,
  website_link: String,
  description: String,
  rating: String,
  category: String,
  product_type: String,
  tag_list: Array,
  created_at: String,
  updated_at: String,
  product_api_url: String,
  api_featured_image: String,
  product_colors: Array,
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = { ProductModel, ProductSchema };
