import { Resend } from "resend";
import twilio from "twilio";
import { siteConfig } from "@/config/site";

type ReceiptData = {
  name: string;
  email: string;
  phone?: string | null;
  amount: number;
  currency: string;
  sessionId: string;
};

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function receiptHtml(data: ReceiptData) {
  const total = formatAmount(data.amount, data.currency);
  return `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2A1418;">
      <div style="background: #B11226; color: #FBF3EE; padding: 32px; border-radius: 16px 16px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">${siteConfig.name}</h1>
        <p style="margin: 8px 0 0; opacity: 0.85;">Comprobante de inscripción</p>
      </div>
      <div style="background: #FBF3EE; padding: 32px; border-radius: 0 0 16px 16px;">
        <p>Hola <strong>${data.name}</strong>,</p>
        <p>Tu pago fue confirmado. Ya tienes tu lugar en el curso.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr><td style="padding: 8px 0; color: #5A464A;">Curso</td><td style="padding: 8px 0; text-align: right;"><strong>${siteConfig.name}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #5A464A;">Sesiones</td><td style="padding: 8px 0; text-align: right;">${siteConfig.sessions} en vivo · ${siteConfig.sessionHours}h c/u</td></tr>
          <tr><td style="padding: 8px 0; color: #5A464A;">Total pagado</td><td style="padding: 8px 0; text-align: right;"><strong>${total}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #5A464A;">Referencia</td><td style="padding: 8px 0; text-align: right; font-size: 12px;">${data.sessionId}</td></tr>
        </table>
        <p style="color: #5A464A; font-size: 14px;">Pronto recibirás los detalles de acceso. Si tienes dudas, responde a este correo.</p>
        <p style="margin-top: 24px;">Con cariño,<br><strong>${siteConfig.instructor}</strong></p>
      </div>
    </div>
  `;
}

function receiptText(data: ReceiptData) {
  const total = formatAmount(data.amount, data.currency);
  return `¡Hola ${data.name}! Tu inscripción a "${siteConfig.name}" está confirmada.\n\nTotal: ${total}\nReferencia: ${data.sessionId}\n\nPronto recibirás los detalles de acceso al curso.`;
}

export async function sendEmailReceipt(data: ReceiptData) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn("[notifications] Resend no configurado, se omite el correo");
    return false;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: data.email,
    subject: `Comprobante de inscripción — ${siteConfig.name}`,
    html: receiptHtml(data),
    text: receiptText(data),
  });
  return true;
}

export async function sendWhatsAppReceipt(data: ReceiptData) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const phone = data.phone?.replace(/\D/g, "");

  if (!sid || !token || !from || !phone) {
    console.warn("[notifications] Twilio/WhatsApp no configurado o sin teléfono");
    return false;
  }

  const client = twilio(sid, token);
  const to = phone.startsWith("52") ? phone : `52${phone}`;

  await client.messages.create({
    from: `whatsapp:${from}`,
    to: `whatsapp:+${to}`,
    body: receiptText(data),
  });
  return true;
}
