import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "¡Inscripción confirmada!",
  description: `Tu lugar en ${siteConfig.name} está reservado.`,
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <main className="thanks">
      <div className="thanks-card">
        <span className="eyebrow">Pago confirmado</span>
        <h1 className="thanks-title">¡Ya estás dentro!</h1>
        <p className="body">
          Tu inscripción a <strong>{siteConfig.name}</strong> fue procesada con
          éxito. Revisa tu correo: ahí llegará tu comprobante con los detalles.
        </p>
        <p className="body muted">
          Si no lo ves en unos minutos, revisa spam o escríbenos.
        </p>
        <Link href="/" className="btn btn-primary">
          Volver al curso
        </Link>
      </div>
    </main>
  );
}
