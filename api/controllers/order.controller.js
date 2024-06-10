const Order = require("../models/order.model");
const User = require("../models/user.model");
const midtransClient = require("midtrans-client");

const createOrder = async (req, res, next) => {
  console.log("SERVER KEY: ", process.env.SERVER_KEY);
  try {
    const newOrder = new Order({
      userId: req.user.id,
      items: req.body.items,
      amount: req.body.total + req.body.delivFee,
      address: req.body.address,
    });

    await newOrder.save();

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: { userCart: { id: req.body.userCartId } },
      },
      { new: true }
    );

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    const transactionId = newOrder._id;
    const grossAmount = newOrder.amount;
    // const authString = btoa(`${process.env.SERVER_KEY}:`);

    const parameters = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: grossAmount,
      },
      item_details: newOrder.items.map((item) => [
        {
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.title,
        },
        {
          name: "Fee",
          price: req.body.delivFee,
          quantity: 1,
        },
      ]),
      customer_details: {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      },
    };

    snap.createTransaction(parameters).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;

      res.status(200).json({
        message: "berhasil",
        dataPayment,
        token: token,
        userCart: user.userCart,
      });
    });

    // const response = await fetch(`${process.env.MIDTRANS_APP_URL}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: `Basic ${authString}`,
    //   },
    //   body: JSON.stringify(payload),
    // });

    // const data = await response.json();
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder };
