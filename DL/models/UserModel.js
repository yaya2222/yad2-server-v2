const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (val) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: { type: String, required: true, select: false },
  isAdmin: { type: Boolean, default: false },
  products: [
    {
      refModel: {
        type: String,
        enum: ["animals", "realEstates", "vehicles", "general_products"],
      },
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "products.refModel",
      },
    },
  ],
  isActive: { type: Boolean, default: true },
  lastConnection: { type: Date, default: new Date(), select: false },
  firstConnection: {
    type: Date,
    default: new Date(),
    immutable: true,
    select: false,
  },
});


module.exports = new mongoose.model("users", UserSchema);
