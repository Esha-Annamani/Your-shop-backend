const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const addressSchema=
  new mongoose.Schema({
    user: {
      type: ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
  }, { timestamps: true })


  mongoose.model("Address", addressSchema);
