const { CartModel } = require("../models/cart.model");
let CartRouter = require("express").Router();

CartRouter.get("/", async (req, res) => {
  let { _id } = req.user;
  try {
    const cart = await CartModel.find({ userId: _id }).populate("productId")
    res.send(cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

// getting by id
CartRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await CartModel.findById({ _id: id }).populate("productId")
    res.send(cart);
  } catch (error) {
    res.send({ error });
  }
});

// adding prodouct
CartRouter.post("/", async (req, res) => {
  let { _id } = req.user;
  let body = req.body;
  try {
    const cart = new CartModel({ ...body, userId: _id });
    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(500).send({error});
  }
});

// updating cart
CartRouter.patch("/:id", async (req, res) => {
  try {
    const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("productId")
    if (!cart) {
      // 404 not found
      res.status(404).send("Cart not found");
    } else {
      res.send(cart);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete cart
CartRouter.delete("/:id", async (req, res) => {
  try {
    const cart = await CartModel.findByIdAndDelete(req.params.id);
    if (!cart) {
      res.status(404).send("Cart not found");
    } else {
      res.send(cart);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = { CartRouter };

// for multiple categories comma saperated
// app.get('/carts', function(req, res) {
//   const categories = req.query.categories.split(',');
//   Cart.find({ category: { $in: categories } }, function(err, carts) {
//     if (err) {
//       // handle error
//     } else {
//       // do something with the carts
//     }
//   });
// });
