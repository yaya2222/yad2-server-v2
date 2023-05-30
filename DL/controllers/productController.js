const AnimalModel = require("../models/AnimalModel");
const RealEstateModel = require("../models/RealEstateModel");
const VehicleModel = require("../models/VehicleModel");
const generalProductModel = require("../models/generalProductModel");

const categoryIdentification = (category) => {
  if (category === "animal") return AnimalModel;
  if (category === "readEstate") return RealEstateModel;
  if (category === "vehicle") return VehicleModel;
  if (category === "generalProduct") return generalProductModel;
};

const create = (category, newProduct) => {
  const Model = categoryIdentification(category);
  return Model.create(newProduct);
};

const read = (category, filter = {}) => {
  const Model = categoryIdentification(category);
  return Model.find(filter);
};

const readById = (category, id) => {
  const Model = categoryIdentification(category);
  return Model.findById(id);
};

const deleteById = (category, id) => {
  const Model = categoryIdentification(category);
  return Model.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

const deleteManyByIdUser=async (id)=>{
const deletedAnimals=await AnimalModel.deleteMany({idUser:id})
const deletedRealEstates=await RealEstateModel.deleteMany({idUser:id})
const deletedVehicles=await VehicleModel.deleteMany({idUser:id})
const deletedProducts=await generalProductModel.deleteMany({idUser:id})
return [...deletedAnimals,...deletedProducts,...deletedRealEstates,...deletedVehicles]
}

const updateById = (category, id, newData) => {
  const Model = categoryIdentification(category);
  return Model.updateById(id, newData, { new: true });
};

module.exports = { create, read, readById, deleteById, updateById ,deleteManyByIdUser};
