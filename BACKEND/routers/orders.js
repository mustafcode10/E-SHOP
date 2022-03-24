const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name email")
    .sort({ dateOrdered: -1 });
  if (!orderList) {
    res.send(500).json({
      success: false,
    });
  }
  res.send(orderList);
});
// Get order list  by user id
router.get("/get/userorders/:userid", async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userid })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      })
      .sort({ dateOrdered: -1 });
    res.status(200).send(userOrderList);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// Get order by id
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });
  if (!order) {
    res.status(500).json({
      success: false,
      message: "the order with the given ID was not found",
    });
  }
  res.send(order);
});

// POST request to create a new order
router.post("/", async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (item) => {
      let newOrderItem = new OrderItem({
        quantity: item.quantity,
        product: item.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;

  // totalPrices is an array of objects with the product id and the total price
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );
  console.log("Total prices: ", totalPrices);
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  console.log("Total price: ", totalPrice);

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();
  if (!order) {
    return res.status(404).send("the order cannot be created");
  }
  res.send(order);
});

// update order
router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );
  if (!order) {
    res.status(404).send("the order with the given ID wasn't found");
  }
  res.send(order);
});
// delete order
router.delete("/:id", async (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      await order.orderItems.map(async (orderItem) => {
        await OrderItem.findByIdAndRemove(orderItem);
      });

      if (order) {
        res.status(200).json({ success: true, message: "order is deleted" });
      } else {
        res.status(404).json({ success: false, message: "order not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "order cannot be deleted",
      });
    });
});

// Total sales for all orders
router.get("/get/totalsales", async (req, res) => {
  const totalSales = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalsales: { $sum: "$totalPrice" },
      },
    },
  ]);
  if (!totalSales) {
    return res.status(400).send("No total sales found");
  }
  res.send({ totalsales: totalSales.pop().totalsales });
});

// Get order count
router.get("/get/count", async (req, res) => {
  const orderCount = await Order.countDocuments();
  if (!orderCount) {
    res.status(404).send("the order count was not found");
  }
  res.send({ orderCount });
});

module.exports = router;
