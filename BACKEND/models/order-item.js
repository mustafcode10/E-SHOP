const mongoose = require("mongoose");
const orderItemSchema = mongoose.Schema({
    quantity:{
        type: Number,
        required: true,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }
})
// virtual id
orderItemSchema.virtual("id").get(function () {
    return this._id.toHexString();
})
// set the virtual id
orderItemSchema.set("toJSON", {
    virtuals: true,
})

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);


