const productController = require("../DL/controllers/productController");
const userController = require("../DL/controllers/userController");
const { session } = require("../DL/session");

const addProduct = async (user, product) => {
  product.idUser = user._id;
  const newProduct = await productController.create(product);
  if (!newProduct) throw new Error("Product creation failed");
  const updateUser = await userController.updateByid(user.id, {
    idProducts: [...user.idProducts, newProduct._id],
  });
  if (!updateUser) throw new Error("Failed to add the product to the user");
  return {
    newProduct,
    updateUser,
  };
};

// const addProduct = async (user, product) => {
//     try {
//       (await session).startTransaction()
//       product.idUser = user._id;
//       const newProduct = await productController.create(product);
//       // if (!newProduct) throw new Error("Product creation failed");
//       const updateUser = await userController.updateByid(user.id, {
//         idProducts: [...user.idProducts, newProduct._id],
//       });
//       // if (!upDateUser) throw new Error("Failed to add the product to the user");
//       (await session).commitTransaction()
// (await session).endSession()
//       return {
//         newProduct,
//         updateUser,
//       };
//     } catch (error) {
//       (await session).abortTransaction()
// (await session).endSession()
//       throw new Error("Failed to add product")
//     }
//   };

const deleteUser = async (userId) => {
  const deleteUser = await userController.deleteById(userId);
  if (!deleteUser) throw new Error("Failed to delete user");
  const deleteProducts = await productController.deleteManyByIdUser(userId);
  if (!deleteProducts) throw new Error("Failed to delete user's products");
  return {
    deleteUser,
    deleteProducts,
  };
};

// const deleteUser = async (user) => {
//   try {
//     (await session).startTransaction();

//     const deleteUser = await userController.deleteById(user._id);
//     if (!deleteUser) throw new Error("Failed to delete user");
//     const deleteProducts = await productController.deleteManyByIdUser(user._id);
//     if (!deleteProducts) throw new Error("Failed to delete user's products");
//     (await session).commitTransaction();
//     (await session).endSession();
//     return {
//       deleteUser,
//       deleteProducts,
//     };
//   } catch (error) {
//     (await session).abortTransaction();
//     (await session).endSession();
//     throw new Error("Failed to add product");
//   }
// };

module.exports = { addProduct, deleteUser };
