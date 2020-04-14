import * as express from "express";
import * as stripeLoader from "stripe";
require("dotenv").config();

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

const stripe = new stripeLoader(process.env.STRIPE_SK);

const charge = (token: string, amt: number) => {
  return stripe.charges.create({
    amount: amt * 100,
    currency: "usd",
    source: token,
    description: "Statement Description",
  });
};

router.post("/api/donate", async (req, res, next) => {
  try {
    let data = await charge(req.body.token.id, req.body.amount);
    console.log(data);
    res.send("Charged");
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

export default router;
