const { default: mongoose } = require("mongoose");
const { ProductSchema } = require("./product.model");

const CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  productId: {
    type: Number,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

// Add a unique compound index on userId and productId
CartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const CartModel = mongoose.model("cart", CartSchema);

module.exports = { CartModel };
