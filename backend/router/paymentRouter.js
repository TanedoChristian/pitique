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
      const newPaymentInfo = {
        ...userPaymentInfo,
        status: payment.status,
        preceipt: payment.id,
        freceipt: payment.id,
      };

      await paymentModel.createPayment(newPaymentInfo);
      res.status(201).json({ message: "payment created successfully" });
    } else {
      res.status(400).send("Bad Payment Error");
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /payments/register - Create a payment
router.post("/register", async (req, res) => {
  const { token } = req.body;

  // Subscription
  const amount = 200;

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
        amount: amount * 100,
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
      res.status(201).json({ message: "payment created successfully" });
    } else {
      res.status(400).send("Bad Payment Error");
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /payments - Create a payment
router.post("/cash", async (req, res) => {
  const { userPaymentInfo } = req.body;

  try {
    await paymentModel.createPayment(userPaymentInfo);
    res.status(201).json({ message: "payment created successfully" });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /payments/info/:bid
router.get("/info/:bid", async (req, res) => {
  const bookingId = req.params.bid;

  try {
    const payment = await paymentModel.getPaymentInfo(bookingId);

    if (!payment) {
      res.status(404).send("payment not found");
    } else {
      res.json(payment);
    }
  } catch (error) {
    console.error(`Error getting payment with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
