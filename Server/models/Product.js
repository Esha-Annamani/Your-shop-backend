const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const productSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    manufacturer: {
      type: String,
    },
    availableItems: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    soldBy: {
        type: ObjectId,
        ref: "User",
        required: true
    }
  }, { timestamps: true });

mongoose.model("Product", productSchema);

