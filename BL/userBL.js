const userController = require("../DL/controllers/userController");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const secret = process.env.SECRET;

const createToken = (id) => jwt.sign({ id }, secret, { expiresIn: "1h" });

const register = async ({ name, email, password }) => {
  if (!name || !email || !password) throw new Error("Missing data");
  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(password + process.env.PASSWORD, salt);
  const newUser = await userController.create({ name, email, password });
  if (!newUser) throw new Error("Creation failed");
  return createToken(newUser._id);
};

const login = async ({ email, password }) => {
  if (!email || !password) throw new Error(`Missing data`);
  const user = await userController.readByEmail(email).select("+password");
  if (
    !user ||
    !bcryptjs.compareSync(password + process.env.PASSWORD, user.password)
  )
    throw new Error("Email or password invalid");
  await userController.updateById(user._id, { lastConnection: new Date() });
  return createToken(user._id);
};

const getDetailsAboutUserById = async (id) => {
  user = await userController.readById(id).populate("products.idProduct");
  if (!user) throw new Error("User is not exsit");
  return user;
};
const getDetailsAboutUserByEmail = async (id) => {
  user = await userController.readByEmail(email).populate("products.idProduct");
  if (!user) throw new Error("Email is not exsit");
  return user;
};

const readAllUsers = (filter) => {
  const allUsers = userController
    .read(filter)
    .select("+lastConnection +firstConnection");
  return allUsers;
};

const updateUserById = async (user, newData) => {
  if (Object.keys(newData).includes(isAdmin)) throw new Error("Not permission");
  if (newData.email) {
    const user = await userController.readByEmail(newData.email);
    if (user) throw "This email almost exsit";
  }
  const upDateUser = await userController.updateByid(user._id, newData);
  if (!upDateUser) throw new Error("The update failed");
  return upDateUser;
};

const updateUserForAdmin = async ( email) => {
  const user = await userController.readByEmail(email);
  const upDateUser = await userController.updateById(user._id, {
    isAdmin: true,
  });
  if (!upDateUser) throw new Error("The update failed");
  return upDateUser;
};

module.exports = {
  register,
  login,
  getDetailsAboutUserById,
  getDetailsAboutUserByEmail,
  readAllUsers,
  updateUserById,
  updateUserForAdmin,
};
