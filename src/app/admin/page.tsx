import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import { BUYERS_TABLE_SCHEMA } from "@/lib/db";

export const metadata: Metadata = {
  title: "Panel de compradores",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="admin-page">
      <div className="container">
        <AdminDashboard />
        <details className="admin-schema">
          <summary>Estructura de la base de datos</summary>
          <pre>{BUYERS_TABLE_SCHEMA}</pre>
          <p className="admin-schema-note">
            Tabla <code>buyers</code> en Postgres (Neon). Se crea automáticamente con el
            primer pago confirmado por Stripe.
          </p>
        </details>
      </div>
    </main>
  );
}
