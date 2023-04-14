const express = require("express");
const { connect } = require("./configs/db");
const cors = require("cors");
const { ProductsRouter } = require("./routes/products.routes");
require("dotenv").config();

let app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.send("hello");
  } catch (error) {
    res.send({ error });
  }
});

app.use("/products", ProductsRouter);


app.listen(8080, async () => {
  try {
    await connect;
    console.log("backend connected");
  } catch (error) {
    console.log(error);
  }
  console.log("listening port 8080");
});
