const mongoose = require("mongoose");
const generalDetails=require("./generalDetails")

const VehicleSchema = new mongoose.Schema(
  {
    category:{type:String ,default:"כלי תחבורה",immutable:true},
    type: {
      type: String,
      required: true,
      enum: ["פרטי", "מסחרי", "ג'יפים", "אפנועים", "קטנועים", "משאיות", "אחר"],
    },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    yearOfManufacturer: Number,
    color: String,
    yad: { type: Number, required: true },
    km: { type: Number, required: true },
    licenseNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return true; //////////////////////////
        },
        message: (props) => `${props.value} is not a valid car number!`,
      },
    },
    licenseGrade: {
      type: String,
      required: true,
      enum: [],
    },
    properties: {
      MaximumCargoWeight: {
        type: Number,
        validate: {
          validator: function () {
            return this.type === "משאיות";
          },
          message: () => `Only trucks can add maximum cargo weight`,
        },
      },
      isHandicapAdapted: {
        type: Boolean,
        default: false,
        validate: {
          validator: function () {
            return ["פרטי", "מסחרי", "ג'יפים", "משאיות"].includes(this.type);
          },
          message: () => `This vehicle cannot be adapted for the disabled`,
        },
      },
    },
    ...generalDetails
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = new mongoose.model("vehicles", VehicleSchema);
