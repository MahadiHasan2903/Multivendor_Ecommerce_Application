const express = require("express");
const paymentRouter = express.Router();
const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

paymentRouter.post(
  "/payment-process",
  CatchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Mahadi",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

paymentRouter.get(
  "/payment-stripeapikey",
  CatchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = paymentRouter;
