const express = require("express");
const { connect } = require("./configs/db");
const cors = require("cors");
const { ProductRouter } = require("./routes/products.routes");
const { UserRouter } = require("./routes/users.routes");
const { CartRouter } = require("./routes/cart.routes");
const { verifyUser } = require("./middlewares/user.middleware");
require("dotenv").config();

let app = express();
app.use(express.json()); // parse incoming requests with json payload
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.send("hello");
  } catch (error) {
    res.send({ error });
  }
});

app.use("/products", ProductRouter);
app.use("/users", UserRouter);
app.use(verifyUser);
app.use("/cart", CartRouter);

app.listen(8080, async () => {
  try {
    await connect;
    console.log("backend connected");
  } catch (error) {
    console.log(error);
  }
  console.log("listening port 8080");
});
