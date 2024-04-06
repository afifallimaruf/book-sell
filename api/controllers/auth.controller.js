const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  const pass = CryptoJs.AES.encrypt(password, process.env.PASS_SEC_KEY);

  try {
    const newUser = new User({
      fullName,
      username,
      email,
      password: pass,
    });

    await newUser.save();

    res.status(200).json("Register successfully");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(errorHandler(400, "All field are required"));
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return next(errorHandler(404, "Authentication failed"));
    }

    const passDecrypt = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC_KEY
    );

    const pass = passDecrypt.toString(CryptoJs.enc.Utf8);

    if (password !== pass) {
      next(errorHandler(401, "Wrong credentials"));
    } else {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_KEY
      );

      res.cookie("token", token, {
        httpOnly: true,
      });
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
