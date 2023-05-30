const productController = require("../DL/controllers/productController");


const read = (category, filter) => productController.read(category,filter);

const readById = async (category,id) => {
  const product = await productController.readById(category,id);
  if (!product) throw new Error(`This id: ${id} is not exsit`);
  return product;
};

const updateById = async (category,id, newData) => {
  readById(category,id);
  const updateProduct = await productController.updateById(category,id, newData);
  if (!updateProduct) throw new Error("Failed to update data");
  return updateProduct;
};

const deleteById = async (category,id) => {
  readById(category,id);
  const deleteProduct = await productController.deleteById(category,id);
  if (!deleteProduct) throw new Error("Failed to delete data");
  return deleteProduct;
};

module.exports = {read,readById,updateById,deleteById};
