import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  createSubscription,
  deleteSubscription,
} from "@/app/actions/userSubscriptions";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "customer.subscription.created",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webHookSecret =
    "whsec_1ae6611b0e7c86ef2db7d77a743bae91db349e3c0da48145fb6e6557d57b7df1";

  if (!webHookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  console.log("-----------------");

  if (!sig) return;

  const event = stripe.webhooks.constructEvent(body, sig, webHookSecret);
  console.log(event.type);

  const data = event.data.object as Stripe.Subscription;

  if (relevantEvents.has(event.type)) {
    switch (event.type) {
      case "customer.subscription.created": {
        await createSubscription({
          stripeCustomerId: data.customer as string,
        });
        break;
      }
      case "customer.subscription.deleted": {
        await deleteSubscription({
          stripeCustomerId: data.customer as string,
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  return new Response(
    JSON.stringify({
      received: true,
    }),
    { status: 200 }
  );
}
