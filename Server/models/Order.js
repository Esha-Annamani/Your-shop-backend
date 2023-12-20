const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const orderSchema=new mongoose.Schema({
  
    address: {
      type: ObjectId,
      ref: "Address",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: 'Quantity cannot be zero or lesser.',
      },
    },
  }, { timestamps: true })

  mongoose.model("Order", orderSchema);
