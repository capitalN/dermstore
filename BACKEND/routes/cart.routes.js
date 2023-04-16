const { CartModel } = require("../models/cart.model");
let CartRouter = require("express").Router();

// getting all queries with filters, sort & pagination
CartRouter.get("/", async (req, res) => {
  try {
    let query = CartModel.find({});
    // it will sort price (String) lexicographically so .colleation is used.
    if (sort)
      query = query
        .sort({ [sort]: order })
        .collation({ locale: "en_US", numericOrdering: true });
    if (limit) query = query.limit(Number(limit));
    if (page) query = query.skip(Number(page - 1) * Number(limit));
    const data = await query.exec();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// getting searched carts
CartRouter.get("/search", async (req, res) => {
  const query = req.query;
  try {
    if (query["q"].length) {
      // regex: pattern to match agains values
      // options:"i" not case senitive
      const searchQuery = { $regex: `${query["q"]}`, $options: "i" };
      const searched = await CartModel.find({
        $or: [
          { brand: searchQuery },
          { name: searchQuery },
          { category: searchQuery },
        ],
      }).limit(10);
      res.send(searched);
    } else {
      res.send({
        msg: "Please type to search by name, brand or category",
        error: "q is not passed",
      });
    }
  } catch (error) {
    // 500 internal server error
    res.status(500).send({ msg: `error in searching carts`, error });
  }
});

// getting by id
CartRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await CartModel.findById({ _id: id });
    res.send(cart);
  } catch (error) {
    res.send({ msg: `can't get cart of id ${id}`, error });
  }
});

// adding prodouct
CartRouter.post("/", async (req, res) => {
  try {
    const cart = new CartModel(req.body);
    await cart.save();
    // 201 Created success
    res.status(201).send(cart);
  } catch (err) {
    // 500
    res.status(500).send(err);
  }
});

// updating cart
CartRouter.patch("/:id", async (req, res) => {
  try {
    const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
