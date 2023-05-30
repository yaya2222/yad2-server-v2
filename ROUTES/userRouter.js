const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const userBL = require("../BL/userBL");
const { validToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");

/**
 * @description Registration of a new user
 * @route POST /users/register
 * @access Public
 * @param {Object} req.body - User registration details
 * @param {string} req.body.name - Name of user
 * @param {string} req.body.email - Email of user
 * @param {string} req.body.password - Password of user
 * @returns {string} Token
 */
router.post(
  "/register",
  asynchandler(async (req, res) => {
    const token = await userBL.register(req.body);
    res.send(token);
  })
);

/**
 * @description Login user
 * @route POST /users/login
 * @access Public
 * @param {Object} req.body - Email and password of the user
 * @param {string} req.body.email - Email of user
 * @param {string} req.body.password - Password of user
 * @returns {string} Token
 */
router.post(
  "/login",
  asynchandler(async (req, res) => {
    const token =await userBL.login(req.body);
    res.send(token);
  })
);

/**
 * @description Get my data
 * @route GET /users/my/details
 * @access Private/user
 * @returns {object} My data
 */
router.get(
    "/my/details",
    validToken,
    asynchandler(async (req, res) => {
      res.send(req.user);
    })
  );

/**
 * @description Get data of user by email
 * @route POST /users/login
 * @access Public
 * @returns {object} Data of user
 */
router.get(
    "/details",
    asynchandler(async (req, res) => {
      const user=userBL.
      res.send(req.user);
    })
  );


/**
 * @description Get information about all users
 * @route GET /users/all/Users
 * @access Private/admin
 * @param {Object} req.body - User filtering
 *  * @param {string} req.body.filter - Password of user
 * @returns {Array} All users
 */
  router.get("/all",validToken,isAdmin,asynchandler(async(req,res)=>{
    const allUsers = await userBL.readAllUsers(req.body.filter);
    res.send(allUsers);
  }))

  /**
 * @description Changing user details
 * @route PUT /users/
 * @access Private/user
 * @param {Object} req.body - The new user information
 * @returns {Object} User information after the change
*/
router.put(
  "/",
  validToken,
  asynchandler(async (req, res) => {
    const updateUser = await userBL.updateUserById(req.user, req.body);
    res.send(updateUser);
  })
  );

    
  /**
   * @description Granting administrator privileges to the user
   * @route PUT /users/permission
   * @access Private/admin
   * @param {Object} req.body - Email and permission
   * @param {string} req.body.email - Email of user
   * @returns {Object} User information after the change
  */
 router.put(
  "/permission",
  validToken,
  isAdmin,
 asynchandler(async (req, res) => {
   const updateUser = await userBL.updateUserForAdmin(req.body.email);
   res.send(updateUser);
 })
);

  module.exports=router