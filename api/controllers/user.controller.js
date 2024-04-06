const User = require("../models/user.model");
const errorHandler = require("../utils/error");

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json("User has been logout");
  } catch (error) {
    next(error);
  }
};

module.exports = { logout };
