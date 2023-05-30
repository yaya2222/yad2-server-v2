const mongoose = require("mongoose");

module.exports = {
  description: String,
  price: {
    type: Number,
    default: 0.0,
  },
  residence: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  video: String,
  firstImage: String,
  images: [String],
  Contacts: {
    type: [
      {
        name: String,
        tel: {
          type: String,
          validate: {
            validator: function (val) {
              return /^05\d([-]{0,1})\d{7}$/.test(val);
            },
            message: (props) =>
              `The number ${props.value} is not an Israeli mobile phone number`,
          },
        },
      },
    ],
    required: true,
  },
 isActive:{type:Boolean,default:true}
};
