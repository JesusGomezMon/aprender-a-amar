import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim() : undefined;

    const stripe = getStripe();
    const siteUrl = siteConfig.url.replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "mxn",
            unit_amount: siteConfig.priceStripe,
            product_data: {
              name: `${siteConfig.name} - Curso en vivo`,
              description: `${siteConfig.sessions} sesiones de ${siteConfig.sessionHours} horas basadas en El arte de amar de Erich Fromm`,
            },
          },
          quantity: 1,
        },
      ],
      ...(email ? { customer_email: email } : {}),
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      success_url: `${siteUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pago`,
      metadata: { course: "aprender-a-amar" },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
