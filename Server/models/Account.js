const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const accountSchema=new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
    },
    balance: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
              return value > 0;
            },
            message: 'Balance cannot be lesser than zero.',
          },
    },
  }, { timestamps: true })

  mongoose.model("Account", accountSchema);
