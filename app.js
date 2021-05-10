require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const Port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const { Product } = require("./models/product.model.js");
app.use(express.json());
app.use(cors());
const products = require("./routes/products.router.js");
const cartproducts = require("./routes/cart.router.js");
const wishlistproducts = require("./routes/wishlist.router.js");
const { initializeDbConnection } = require("./db/db.connection.js");

app.get("/", (req, res) => {
  res.send("Hello moto");
});

initializeDbConnection();
app.use("/cartproducts", cartproducts);
app.use("/wishlistproducts", wishlistproducts);
app.use("/product", products);

app.listen(Port, () => {
  console.log(`Example app listening at ${Port}`);
});
