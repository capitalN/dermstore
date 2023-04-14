app.get('/products', (req, res) => {
  const { product_type, category, sort, brand, min, max, tag_list, limit, page } = req.query;
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
  const query = Product.find(filter);
  if (sort) query.sort({ [sort]: 'asc' });
  if (limit) query.limit(Number(limit));
  if (page) query.skip(Number(page - 1) * Number(limit));
  query.exec((err, docs) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(docs);
    }
  });
});