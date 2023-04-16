const { default: mongoose } = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: String,
  quantity: Number,
  item: Object,
  cartId: String,
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = { CartModel };