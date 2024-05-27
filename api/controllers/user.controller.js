const User = require("../models/user.model");
const errorHandler = require("../utils/error");

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json("User has been logout");
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  let duplicate = false;
  let quantity = 1;

  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    } else {
      user.userCart.forEach((item) => {
        if (item.id == req.body.bookId) {
          duplicate = true;
        }
      });

      if (duplicate) {
        User.findOneAndUpdate(
          { _id: req.user.id, "userCart.id": req.body.bookId },
          {
            $inc: {
              "userCart.$.quantity": 1,
              "userCart.$.totalAmount": req.body.price * quantity,
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return next(err);
            res.status(200).json(userInfo);
          }
        );
      } else {
        User.findOneAndUpdate(
          { _id: req.user.id },
          {
            $push: {
              userCart: {
                id: req.body.bookId,
                image: req.body.image,
                title: req.body.title,
                price: req.body.price,
                quantity,
                totalAmount: req.body.price * quantity,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return next(err);
            res.status(200).json(userInfo);
          }
        );
      }
    }
  } catch (error) {
    return next(error);
  }
};

const removeCart = async (req, res, next) => {
  try {
    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: { userCart: { id: req.query.id } },
      },
      { new: true },
      (err, userInfo) => {
        let cart = userInfo.userCart;
        res.status(200).json(cart);
      }
    );
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 4 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 4 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          fullName: req.body.fullName,
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { logout, addToCart, removeCart, updateUser };
