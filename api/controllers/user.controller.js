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

module.exports = { logout, addToCart, removeCart };
