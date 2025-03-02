import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!sig) {
    res.status(400).send("Stripe signature is missing");
    return;
  }
  const rawBody = await getRawBody(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error}`);
    return;
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      const { userId, productId } = paymentIntent.metadata;

      break;
    default:
  }

  res.status(200).json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
