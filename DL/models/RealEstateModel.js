const mongoose = require("mongoose");
const generalDetails = require("./generalDetails");

const subTypeRealEstate = [
  " דירה",
  " דירת גן",
  " בית פרטי/קוטג'",
  " גג/פנטהאוז",
  " מגרשים",
  " דופלקס",
  " תיירות ונופש",
  " דו משפחתי",
  " מרתף/פרטר",
  " טריפלקס",
  " יחידת דיור",
  " משק חקלאי/נחלה",
  " משק עזר",
  " דיור מוגן",
  " בניין מגורים",
  " סטודיו/לופט",
  " מחסן",
  " חניה",
];

const commercial = [
  " משרדים",
  " חנויות/שטח מסחרי",
  " חלל עבודה משותף",
  " אולמות",
  " מבני תעשיה",
  " מחסנים",
  " מגרשים",
  " בניין משרדים",
  " חניון",
  " מרתף",
  " כללי",
  " סטודיו",
  " קליניקות",
  " בית מלון",
];
const RealEstateSchema = new mongoose.Schema(
  {
    category: { type: String, default: 'נדל"ן', immutable: true },
    type: {
      type: String,
      required: true,
      enum: ["מסחרי", 'נדל"ן'],
    },
    Subtype: {
      type: String,
      validate: {
        validator: function (val) {
          if (this.type === 'נדל"ן')
            return isValInArray(subTypeRealEstate, val);
          if (this.type === "מסחרי") return isValInArray(commercial, val);
          return false;
        },
        message: (props) => `${props.value} is not a valid subtype!`,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["חדש מקבלן", "חדש", "משופץ", "במצב שמור", "דרוש שיפוץ"],
    },
    floor: { type: Number, required: true },
    totalFloorsInTheBuilding: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          return this.floor <= val;
        },
        message: () =>
          "The number of floors in the building cannot be less than the floor of the apartment",
      },
    },
    street: { type: String, required: true },
    buildingNumber: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    builtSquareMeter: Number,
    totalSquareMeter: {
      type: Number,
      validate: {
        validator: function (val) {
          return !this.builtSquareMeter || val > this.builtSquareMeter;
        },
        message:
          "The general total square meter cannot be less than the total built square meter",
      },
    },
    entryDate: Date,
    properties: {
      isParking: Boolean, //חנייה
      isPorch: Boolean, //מרפסת
      isMerger: Boolean, //מיזוג
      isResidentialSecureSpace: Boolean, //ממ"ד
      isStoreroom: Boolean, //מחסן
      isFurniture: Boolean, //ריהוט
      isHandicapAdapted: Boolean, //גישה לנכים
      isElevators: Boolean, //מעלית
      isKosherkitchen: Boolean, //מטבח כשר
      isSunHeatedWaterTank: Boolean, //דוד שמש
      isBars: Boolean, //סורגים
    },
    ...generalDetails,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = new mongoose.model("realEstates", RealEstateSchema);
