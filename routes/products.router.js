const express = require("express");
const router = express.Router();
const { Product } = require("../models/product.model.js");
const { Cart } = require("../models/cart.model.js");
const { json } = require("express");

router
  .route("/cakes")

  .get(async (req, res) => {
    try {
      const result = await Product.find({ category: "cake" });
      res.send(result);
      console.log(result);
    } catch (err) {
      res.send(err);
    }
  });
router
  .route("/cupcakes")

  .get(async (req, res) => {
    try {
      const result = await Product.find({ category: "cupcake" });
      res.send(result);
      // console.log(result);
    } catch (err) {
      res.send(err);
    }
  });

router.route("/brownies").get(async (req, res) => {
  try {
    console.log("here");
    const result = await Product.find({ category: "brownie" });
    // console.log(result);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

router.route("/cookies").get(async (req, res) => {
  try {
    const result = await Product.find({ category: "cookie" });
    res.send(result);
    // console.log(result);
  } catch (err) {
    res.send(err);
  }
});
router
  .param("productId", async (req, res, next, productId) => {
    console.log("here", productId);

    try {
      const product = await Product.findById(productId);
      // console.log(product);

      if (!product) {
        return res
          .status(400)
          .json({ success: false, message: "product not found" });
      }

      req.item = product;
      next();
    } catch {
      res
        .status(400)
        .json({ success: false, message: "could not retrieve product " });
    }
  })

  .route("/:productId")

  .get(async (req, res) => {
    try {
      const { item } = req;

      // const { productId } = req.body;
      // const product = await Product.findById(productId);
      console.log({ item });

      res.json(item);
    } catch (err) {
      res.status(404).send(err);
    }
  });

// router.route("/rams").get(async (req, res) => {
//   try {
//     // const result = await Product.find({ category: "cookie" });
//     res.send({ success: "true" });
//     console.log("true");
//   } catch (err) {
//     res.send(err);
//   }
// });

// router.route("/cakes/1").get(async (req, res) => {
//   try {
//     // const result = await Product.find({ category: "cookie" });
//     res.send({ result: "true" });
//     // console.log(result);
//   } catch (err) {
//     res.send(err);
//   }
// });

module.exports = router;
