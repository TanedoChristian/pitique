require("dotenv").config();
const express = require("express");
const router = express.Router();
const PaymentModel = require("../model/paymentModel");

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");

const paymentModel = new PaymentModel();

// POST /payments - Create a payment
router.post("/", async (req, res) => {
  const { token, userPaymentInfo } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      name: token.card.name,
      shipping: {
        address: {
          city: token.card.address_city,
          country: token.card.address_country,
          line1: token.card.address_line1,
          postal_code: token.card.address_zip,
        },

        name: token.card.name,
      },
      source: token._id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: userPaymentInfo.total * 100,
        currency: "php",
        customer: customer.id,
        receipt_email: token.email,
        payment_method: "pm_card_visa",
        confirmation_method: "manual",
        confirm: true,
        shipping: customer.shipping,
        return_url: "https://example.com/checkout/complete",
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      await paymentModel.createPayment(userPaymentInfo);
      res.status(201).json({ message: "payment created successfully" });
    } else {
      res.status(400).send("Bad Payment Error");
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;