const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});
// virtual id
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// set the virtual id
orderSchema.set("toJSON", {
  virtuals: true,
});

exports.Order = mongoose.model("Order", orderSchema);

/**
 * order example:
 * {
 * "orderItems": [
 * {"product": "5f4b8f8f8f8f8f8f8f8f8f", "quantity": 2},
 * {"product": "5f4b8f8f8f8f8f8f8f8f8f", "quantity": 4}],
 * ],
 * "shippingAddress1": "123 Main St",
 * "shippingAddress2": "2nd Floor",
 * "city": "New York",
 * "zip": "10001",
 * "country": "USA",
 * "phone": "1234567890",
 * "status": "pending",
 * "totalPrice": 0,
 * "user": "5f4b8f8f8f8f8f8f8f8f8f",
 * "dateOrdered": "2020-05-05T00:00:00.000Z"
 *
 * }
 *
 */
