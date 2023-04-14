const { isAdmin } = require("../middlewares/admin.middleware");
const { ProductModel } = require("../models/product.model");
let ProductsRouter = require("express").Router();

// getting all queries with filters, sort & pagination
ProductsRouter.get("/", async (req, res) => {
  const {
    product_type,
    category,
    sort,
    brand,
    min,
    max,
    tag_list,
    limit,
    page = 1,
    order,
  } = req.query;
  const filter = {};
  if (product_type) filter.product_type = product_type;
  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (tag_list) filter.tags = tag_list;
  if (min || max) {
    filter.price = {};
    if (min) filter.price.$gte = min;
    if (max) filter.price.$lte = max;
  }

  try {
    let query = ProductModel.find(filter);
    if (sort) query = query.sort({ [sort]: order });
    if (limit) query = query.limit(Number(limit));
    if (page) query = query.skip(Number(page - 1) * Number(limit));
    const data = await query.exec();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// getting searched products
ProductsRouter.get("/search", async (req, res) => {
  const query = req.query;
  try {
    if (query["q"].length) {
      // regex: pattern to match agains values
      // options:"i" not case senitive
      const searchQuery = { $regex: `${query["q"]}`, $options: "i" };
      const searched = await ProductModel.find({
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
    res.status(500).send({ msg: `error in searching products`, error });
  }
});

// getting by id
ProductsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById({ _id: id });
    res.send(product);
  } catch (error) {
    res.send({ msg: `can't get product of id ${id}`, error });
  }
});

// adding prodouct
ProductsRouter.post("/products", isAdmin, async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    // 201 Created success
    res.status(201).send(product);
  } catch (err) {
    // 500
    res.status(500).send(err);
  }
});

// updating product
ProductsRouter.patch("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      // 404 not found
      res.status(404).send("Product not found");
    } else {
      res.send(product);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete product
ProductsRouter.delete("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.send(product);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = { ProductsRouter };
