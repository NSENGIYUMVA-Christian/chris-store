// domain/.netlify/functions/create-payment-intent

// invoking env variables
require("dotenv").config();

//not working, fix later
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, total_amount, shipping_fees } = JSON.parse(event.body);

    // checkout calculation
    const calculateOrderAmount = () => shipping_fees + total_amount;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "create payment intent",
  };
};
