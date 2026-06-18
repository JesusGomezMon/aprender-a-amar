import { sql } from "@vercel/postgres";

export type Buyer = {
  id: number;
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  email: string;
  name: string | null;
  phone: string | null;
  amount: number;
  currency: string;
  status: string;
  email_sent: boolean;
  whatsapp_sent: boolean;
  created_at: string;
};

let schemaReady: Promise<void> | null = null;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS buyers (
        id SERIAL PRIMARY KEY,
        stripe_session_id TEXT UNIQUE NOT NULL,
        stripe_payment_intent_id TEXT,
        email TEXT NOT NULL,
        name TEXT,
        phone TEXT,
        amount INTEGER NOT NULL,
        currency TEXT NOT NULL DEFAULT 'mxn',
        status TEXT NOT NULL DEFAULT 'paid',
        email_sent BOOLEAN DEFAULT FALSE,
        whatsapp_sent BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `.then(() => undefined);
  }
  return schemaReady;
}

export async function saveBuyer(data: {
  stripeSessionId: string;
  stripePaymentIntentId?: string | null;
  email: string;
  name?: string | null;
  phone?: string | null;
  amount: number;
  currency: string;
}) {
  await ensureSchema();

  const result = await sql`
    INSERT INTO buyers (
      stripe_session_id,
      stripe_payment_intent_id,
      email,
      name,
      phone,
      amount,
      currency
    ) VALUES (
      ${data.stripeSessionId},
      ${data.stripePaymentIntentId ?? null},
      ${data.email},
      ${data.name ?? null},
      ${data.phone ?? null},
      ${data.amount},
      ${data.currency}
    )
    ON CONFLICT (stripe_session_id) DO UPDATE SET
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      phone = EXCLUDED.phone
    RETURNING *
  `;

  return result.rows[0] as Buyer;
}

export async function markNotificationsSent(
  stripeSessionId: string,
  flags: { emailSent?: boolean; whatsappSent?: boolean },
) {
  await ensureSchema();

  if (flags.emailSent) {
    await sql`
      UPDATE buyers SET email_sent = TRUE WHERE stripe_session_id = ${stripeSessionId}
    `;
  }
  if (flags.whatsappSent) {
    await sql`
      UPDATE buyers SET whatsapp_sent = TRUE WHERE stripe_session_id = ${stripeSessionId}
    `;
  }
}

export async function listBuyers() {
  await ensureSchema();
  const result = await sql`
    SELECT * FROM buyers ORDER BY created_at DESC
  `;
  return result.rows as Buyer[];
}

export const BUYERS_TABLE_SCHEMA = `
CREATE TABLE buyers (
  id              SERIAL PRIMARY KEY,
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  email           TEXT NOT NULL,
  name            TEXT,
  phone           TEXT,
  amount          INTEGER NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'mxn',
  status          TEXT NOT NULL DEFAULT 'paid',
  email_sent      BOOLEAN DEFAULT FALSE,
  whatsapp_sent   BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
`.trim();
