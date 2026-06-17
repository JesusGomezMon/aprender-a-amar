import { NextResponse } from "next/server";
import Stripe from "stripe";
import { markNotificationsSent, saveBuyer } from "@/lib/db";
import { sendEmailReceipt, sendWhatsAppReceipt } from "@/lib/notifications";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook no configurado" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Firma ausente" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("[webhook] firma inválida", error);
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const email = session.customer_details?.email;
    if (!email) {
      console.error("[webhook] sesión sin email", session.id);
      return NextResponse.json({ received: true });
    }

    const name = session.customer_details?.name ?? "Participante";
    const phone = session.customer_details?.phone ?? null;
    const amount = session.amount_total ?? 0;
    const currency = session.currency ?? "mxn";

    await saveBuyer({
      stripeSessionId: session.id,
      stripePaymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      email,
      name,
      phone,
      amount,
      currency,
    });

    const receipt = {
      name,
      email,
      phone,
      amount,
      currency,
      sessionId: session.id,
    };

    const emailSent = await sendEmailReceipt(receipt).catch((err) => {
      console.error("[webhook] email falló", err);
      return false;
    });

    const whatsappSent = await sendWhatsAppReceipt(receipt).catch((err) => {
      console.error("[webhook] whatsapp falló", err);
      return false;
    });

    await markNotificationsSent(session.id, { emailSent, whatsappSent });
  }

  return NextResponse.json({ received: true });
}
